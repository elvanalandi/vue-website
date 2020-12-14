import {Role} from './Role';
import BaseUser from './BaseUser';

export default class Admin extends BaseUser{
    public nip = 0;
    public role: Role = Role.ADMIN;
}