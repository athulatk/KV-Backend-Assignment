import EntityNotFoundException from "../exception/EntityNotFoundException";
import { DepartmentRepository } from "../repository/DepartmentRepository"
import { ErrorCodes } from "../util/errorCode";

export class DepartmentService{
    constructor(private deptrepo:DepartmentRepository){}
    async getAllDepartments(){
        return await this.deptrepo.getAllDepartments()
    }
    async getById(id:string){
        const departmentId=await this.deptrepo.getById(id)
        if(!departmentId){
            throw new EntityNotFoundException(ErrorCodes.DEPT_NOT_FOUND);
        }
        else{
            return departmentId
        }
    }
    async createDepartment(name:string){
        return await this.deptrepo.createDepartment(name)
    }
    async updateDepartment(id:string,name:string){
        const departmentId=await this.deptrepo.getById(id)
        if(!departmentId){
            throw new EntityNotFoundException(ErrorCodes.DEPT_NOT_FOUND)
        }
        else{
            return await this.deptrepo.updateDepartment(id,name)
        }
        
    }
    async deleteDepartment(id:string){
        const departmentId=await this.deptrepo.getById(id)
        if(!departmentId){
            throw new EntityNotFoundException(ErrorCodes.DEPT_NOT_FOUND)
        }
        else{
            return await this.deptrepo.deleteDepartment(id)
        }
    }
}
  