import { ObjectLiteral } from "typeorm";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import { Employee } from "../entities/Employee";
import { EmployeeAddress } from "../entities/EmployeeAddress";
import { plainToClass } from "class-transformer";
import { AddressDto } from "../dto/AddressDto";
import HttpException from "../exception/HttpException";
import bcrypt from "bcrypt"
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameorPasswordException";
import jsonwebtoken from "jsonwebtoken"
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";

export class EmployeeService{
    constructor(private employeerepo:EmployeeRepository){}
    async getAllEmployees(){
        return await this.employeerepo.getAllEmployees()
    }
    async getById(id:string){
        const employeeId=await this.employeerepo.getById(id)
        if(!employeeId){
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
        else{
            return employeeId
        }
    }

    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeerepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
      
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "custom:role": employeeDetails.role
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  


    public async createEmployee(empData: CreateEmployeeDto) {
        try {
            const newEmployee = plainToClass(Employee, {
                id:empData.id,
                name: empData.name,
                email: empData.email,
                password: empData.password ?  await bcrypt.hash(empData.password, 10): '',
                joiningDate: empData.joiningDate,
                role:empData.role,
                status:empData.status,
                experience:empData.experience,
                employeeAddress:empData.employeeAddress,
                departmentId:empData.departmentId
            });
            const save = await this.employeerepo.createEmployee(newEmployee);
            return save;
        } catch (err) {
            console.log(err)
        }
    }

    async updateEmployee(id:string,empData:UpdateEmployeeDto){
      const employeeId=await this.employeerepo.getById(id)
      if(!employeeId){
          throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
      }
      else{
        const newEmployee = plainToClass(Employee, {
          name: empData.name,
          email: empData.email,
          password: empData.password ? await bcrypt.hash(empData.password, 10): '',
          joiningDate: empData.joiningDate,
          role:empData.role,
          status:empData.status,
          experience:empData.experience,
          departmentId:empData.departmentId
      });
          return await this.employeerepo.updateEmployee(id,newEmployee)
      }
      
    }
    async deleteEmployee(id:string){
      const employeeId=await this.employeerepo.getById(id)
        if(!employeeId){
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
        else{
          return await this.employeerepo.deleteEmployee(id)
        }
        
    }
    async updateAddress(id:string,empData:AddressDto){
      const employeeId=await this.employeerepo.getById(id)
        if(!employeeId){
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
        else{
            const newAddress= plainToClass(EmployeeAddress,{
              houseName:empData.houseName,
              streetName:empData.streetName,
              city:empData.city,
              state:empData.state,
              country:empData.country,
              zipCode:empData.zipCode
            })
            return await this.employeerepo.updateAddress(id,newAddress)
        }
      
    }
}
    
    