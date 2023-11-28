import {getUserUtils} from "../../services/servicesLocator/composer"
import {GetUserFields, NewUserFields2} from "../../interfaces";

function getUserByEmail(email: string): Promise<GetUserFields | string> {
    const userUtils = getUserUtils();
    return userUtils.getUserByEmail(email);
}

function createUser(user: NewUserFields2): Promise<any>{
    const userUtils = getUserUtils();
    return userUtils.createUser(user);
}

export default{
    getUserByEmail,
    createUser
}