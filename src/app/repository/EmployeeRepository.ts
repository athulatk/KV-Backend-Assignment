import { getConnection, ObjectLiteral } from "typeorm";
import { AddressDto } from "../dto/AddressDto";
import { Employee } from "../entities/Employee";
import { EmployeeAddress } from "../entities/EmployeeAddress";

export class EmployeeRepository{
    async getAllEmployees(){
        const employeeRepo = getConnection().getRepository(Employee)
        return await employeeRepo.find({relations:['department','employeeAddress']})
    }
    async getById(id:string){
        const employeeRepo = getConnection().getRepository(Employee)
        return await employeeRepo.findOne({relations:['department','employeeAddress'], where: { id: id }}, )
    }
    public async getEmployeeByName(name: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name },
        });
        return employeeDetail;
    }
    async createEmployee(empData:Employee){
        const employeeRepo=getConnection().getRepository(Employee)
        return employeeRepo.save(empData)
    }
    async updateEmployee(
        id:string,empData:Employee){
        const employeeRepo=getConnection().getRepository(Employee)
        const emp=await employeeRepo.update(id, empData)
        return emp;
    }
    async deleteEmployee(id:string){
        const employeeRepo=getConnection().getRepository(Employee)
        employeeRepo.softDelete(id)
        
    }
    async updateAddress(id:string,address:EmployeeAddress){
        const employeeRepo=getConnection().getRepository(Employee)
        const employeeDetail = await employeeRepo.findOne({
            relations:['department','employeeAddress'],
            where: { id:id },
        });
        const employeeAddressId=employeeDetail.employeeAddress.id;
        const employeeAddressRepo=getConnection().getRepository(EmployeeAddress)
        const empAdd=await employeeAddressRepo.update(employeeAddressId,address)
        return empAdd
    }

}