import { adminLOGINInput } from "./adminService.type";

export interface IAdminService{
    adminLOGIN(data:adminLOGINInput) : Promise<any | null>;
    fetchDataService():Promise<any|null>
    blockUserService(email:string):Promise<any|null>
    unblockUserService(email:string):Promise<any|null>
    changeCoachStatusService(email:string,newStatus:string):Promise<any|null>
}
