import BaseEntity from "./BaseEntity";
import { Role } from "../common/Role";
import { deserialize, inheritSerialization, serialize, serializeAs } from "cerialize";

inheritSerialization(BaseEntity)
export default class LibraryUser extends BaseEntity {

    @deserialize
    @serialize
    public username: string = "";

    @deserialize
    @serialize
    public password: string = "";

    @deserialize
    @serialize
    public profileName: string = "";

    @deserialize
    @serialize
    public address: string = "";

    @deserialize
    public role: Role = Role.ROLE_USER;

    @deserialize
    public token: string = "";

    public get isAdmin(){
        return this.role === Role.ROLE_ADMIN;
    }
}