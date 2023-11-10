import {Connection} from "mysql2"
import redis from "../../services/redis"

export class UserUtils{
	
	private database;
	
	constructor(db){
		this.database = db;
	}

	async function getUsers(){
		const existCache = await redis.get('allUsers');
		if(existCache){
			return JSON.parse(existCache);
		}
		const [rows, fields] = this.database.query("SELECT * FROM users")
		const sendable = {
			rows,
			fields
		}
		await redis.set('allUsers', JSON.stringify(sendable));
		const todayEnd = new Date().setHours(23, 59, 59, 999);
		await redis.expireAt("allUsers", todayEnd/1000);
		return sendable
	}
}
