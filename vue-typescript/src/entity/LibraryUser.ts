import BaseEntity from "./BaseEntity";
import { Role } from "./Role";

export default class LibraryUser extends BaseEntity {

    public username: string = "";

    public password: string = "";

    public profileName: string = "";

    public address: string = "";

    public role: Role = Role.USER;

    public token: string = "";

    public get isAdmin(){
        return this.role = Role.ADMIN;
    }
}