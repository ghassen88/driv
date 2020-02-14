import { v4 as uuid } from 'uuid';

export class GroupDetail{
    groupId: uuid;
    name: string;
    description: string;
    addresse: string;
    postalCode:string;
    city: string;
    isActif:boolean;
    admins: ShortGroupManager[];
    createdAt: Date;
    members:number;
}
export class ShortGroupManager{
    managerName:string;
    addedAt: Date;
    managerId: uuid;
}