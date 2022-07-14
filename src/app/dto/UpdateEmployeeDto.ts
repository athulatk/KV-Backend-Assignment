import { IsString } from "class-validator";

export class UpdateEmployeeDto{

    @IsString()
    public name?:string
  
    @IsString()
    public password?:string

    @IsString()
    public email?:string

    @IsString()
    public joiningDate?:Date

    @IsString()
    public role?:string
   
    @IsString()
    public status?:string
   
    @IsString()
    public experience?:string

    @IsString()
    public departmentId?:string
 

}