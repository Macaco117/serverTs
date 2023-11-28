import {Connection} from "mysql2"
import {DependencyLocator} from "./dependencyLocator";
import database from "../database"
import { UserUtils } from "../../utils/users"
import { UserUtilsInterface } from "../../interfaces/utils/user";

export const di= DependencyLocator.getInstance();

const types = {
	database: "database-conexion",
	users: "users-utils"
}

function getDatabase(): Connection {
	return di.get(types.database);
}

export function init(){
	di.bindLazySingleton(types.database, () => database);
	di.bindFactory(types.users, () => new UserUtils(getDatabase()));
}

export function getUserUtils(): UserUtilsInterface {
	return di.get(types.users);
}