import {Connection} from "mysql2"
import redis from "../../services/redis"
import {GetUserFields, NewUserFields2} from "../../interfaces"
import CryptoJS from "crypto-js"

export class UserUtils{
	private database;
	
	constructor(db: Connection){
		this.database = db;
	}

	public async getUserByEmail(email: string): Promise<GetUserFields | string> {
		const query = `SELECT * FROM users WHERE email = '${email}'`;
		const [rows] = await this.database.promise().query(query);
		if (Array.isArray(rows) && rows.length === 0){
			return `User with email ${email} not found`;
		}
		return rows [0];
	}

	public async getUsers(): Promise <any> {
		const existCache = await (await redis).get('users');
		if(existCache){
			return JSON.parse(existCache);
		}
		const query = `SELECT * FROM users`;
		const [rows, fields] = await this.database.promise().query(query);
		const sendable = {
			rows,
			fields
		}
		await redis.set('users', JSON.stringify(sendable));
		const todayEnd = new Date().setHours(23, 59, 59, 999);
		await redis.expireAt("users", todayEnd/1000);
		return sendable;
	}

	public async createUser(user: NewUserFields2): Promise <any> {
		const {names, lastNames, email, password} = user;
		const hash = CryptoJS.AES.encrypt(password, process.env.Secret_Key).toString();
		const query = `INSERT INTO users (names, lastNames, email, password) VALUES (?, ?, ?, ?)`;
		const [rows] = await this.database.promise().query(query, [names, lastNames, email, password, hash]);
		return rows;
	}
}
