import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRepository{
    async getAllDepartments(){
        const DeptRepo = getConnection().getRepository(Department)
        return await DeptRepo.find()
    }
    async getById(id:string){
        const DeptRepo = getConnection().getRepository(Department)
        return await DeptRepo.findOne({where:{id:id}})
    }
    async createDepartment(name:string){
        const DeptRepo = getConnection().getRepository(Department)
        return DeptRepo.save({name})
    }
    async updateDepartment(id:string,name:string){
        const DeptRepo=getConnection().getRepository(Department)
        const emp=await DeptRepo.update(id,{name})
        return emp;
    }
    async deleteDepartment(id:string){
        const employeeRepo=getConnection().getRepository(Department)
        employeeRepo.softDelete(id)
        
    }
}