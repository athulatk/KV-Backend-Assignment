import { Type } from "class-transformer";
import { IsDefined, IsString, ValidateNested} from "class-validator";
import { AddressDto } from "./AddressDto";

export class CreateEmployeeDto{
    @IsString()
    public id:string

    @IsString()
    public name:string

    @IsString()
    public password:string

    @IsString()
    public email:string

    @IsString()
    public joiningDate:Date

    @IsString()
    public role:string

    @IsString()
    public status:string

    @IsString()
    public experience:string

    @IsString()
    public departmentId:string

    @ValidateNested()
    @IsDefined()
    @Type(()=>AddressDto)
    public employeeAddress:AddressDto
 

}