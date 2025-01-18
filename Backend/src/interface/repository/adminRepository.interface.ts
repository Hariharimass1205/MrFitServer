
export interface IAdminRepository{
    fetchDataRepo():Promise<any|null>
    blockUserbyEmail(email:string):Promise<any|null>
    unblockUserbyEmail(email:string):Promise<any|null>
    changeStatusByEmail(email:string,newStatus:string):Promise<any|null>
}