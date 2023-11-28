import {GetUserFields, NewUserFields2} from "../../interfaces"

export interface UserUtilsInterface{
    getUserByEmail(email: string): Promise<GetUserFields | string>
    getUsers(): Promise<any>;
    createUser(user: NewUserFields2): Promise <any>
}