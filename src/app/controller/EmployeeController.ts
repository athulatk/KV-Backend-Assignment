import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/ValidationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
import authorize from "../middleware/AuthorizationMiddleware";
import Role from "../enums/Role";
import { AddressDto } from "../dto/AddressDto";


class EmployeeController extends AbstractController {
  constructor(private employeeService:EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}`, authorize(), this.getAllEmployees);
    this.router.get(`${this.path}/:id`, authorize(), this.getById);
    this.router.post(`${this.path}`, authorize([Role.ADMIN,Role.HR]), validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body), this.createEmployee);
    this.router.put(`${this.path}/:id`, authorize([Role.ADMIN,Role.HR]),validationMiddleware(UpdateEmployeeDto,APP_CONSTANTS.body), this.updateEmployee);
    this.router.delete(`${this.path}/:id`, authorize([Role.ADMIN,Role.HR]), this.deleteEmployee);
    this.router.post(`${this.path}/login`,this.login);
    this.router.put(`${this.path}/:id/address`,authorize([Role.ADMIN,Role.HR]),validationMiddleware(AddressDto,APP_CONSTANTS.body), this.updateAddress);
  }

  private getAllEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      response.send(this.fmt.formatResponse(await this.employeeService.getAllEmployees(), Date.now() - request.startTime, "OK"))
    } catch (error) {
      return next(error);
    }
  }
  private getById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      response.send(this.fmt.formatResponse(await this.employeeService.getById(request.params.id), Date.now() - request.startTime, "OK"))
    } catch (error) {
      return next(error);
    }
  }

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    console.log(request.body)
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.name,
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  };

  private createEmployee = async (request: RequestWithUser, response: Response, next: NextFunction)=>{
    try{
        response.status(200)
        console.log(request.body)
        response.send(this.fmt.formatResponse(await this.employeeService.createEmployee(request.body), Date.now() - request.startTime, "OK"))
    }
    catch (error){
        return next(error)
    }
  }

  private updateEmployee = async (request: RequestWithUser, response: Response, next: NextFunction)=>{
    try{
        response.status(200)
        response.send(this.fmt.formatResponse(await this.employeeService.updateEmployee(request.params.id,request.body), Date.now() - request.startTime, "OK"))
    }
    catch (error){
        return next(error)
    }
  }

  private deleteEmployee = async (request: RequestWithUser, response: Response, next: NextFunction)=>{
    try{
        response.status(200)
        console.log(request.params.id)
        response.send(this.fmt.formatResponse(await this.employeeService.deleteEmployee(request.params.id), Date.now() - request.startTime, "OK"))
    }
    catch(error){
        return next(error)
    }
  }

  private updateAddress = async(request:RequestWithUser,response:Response,next:NextFunction)=>{
    try{
      response.status(200)
      response.send(this.fmt.formatResponse(await this.employeeService.updateAddress(request.params.id,request.body),Date.now() - request.startTime, "OK"))
    }
    catch(error){
      return next(error)
    }
  }
}

export default EmployeeController;
