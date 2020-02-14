import { v4 as uuid } from 'uuid';

export class LoginInfo{
    token: string;
    managerName: string;
    managerId: uuid;
    role: string;
    teamName: string;
    teamId: uuid;
}