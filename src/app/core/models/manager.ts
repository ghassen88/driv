import { v4 as uuid } from 'uuid';

export class ShortManager{
    managerId?: uuid;
    firstName: string;
    lastName: string;
}
export class Manager extends ShortManager{
    email?: string;
    password: string;
    confirmPassword: string;
    address: string;
    city: string;
    zip: number;
    phoneNumber: number;
    teamName: string;
    userName: string;
    token?: string;
    constructor(){
            super();
            
    }
}