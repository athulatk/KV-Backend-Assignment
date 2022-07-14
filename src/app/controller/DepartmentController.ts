import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import authorize from "../middleware/AuthorizationMiddleware";
import { DepartmentDto } from "../dto/DepartmentDto";
import validationMiddleware from "../middleware/ValidationMiddleware";
import Role from "../enums/Role";

class DepartmentController extends AbstractController {
  constructor(private departmentService:DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}`, authorize(), this.getAllDepartments);
    this.router.get(`${this.path}/:id`, authorize(), this.getById);
    this.router.post(`${this.path}`, authorize([Role.ADMIN,Role.HR]), validationMiddleware(DepartmentDto,APP_CONSTANTS.body),this.createDepartment);
    this.router.put(`${this.path}/:id`, authorize([Role.ADMIN,Role.HR]), validationMiddleware(DepartmentDto,APP_CONSTANTS.body),this.updateDepartment);
    this.router.delete(`${this.path}/:id`,authorize([Role.ADMIN,Role.HR]), this.deleteDepartment);
  }
  
  private getAllDepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      response.send(this.fmt.formatResponse(await this.departmentService.getAllDepartments(), Date.now() - request.startTime, "OK"))
    } catch (error) {
      return next(error);
    }
  }

  private getById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      response.send(this.fmt.formatResponse(await this.departmentService.getById(request.params.id), Date.now() - request.startTime, "OK"))
    } catch (error) {
      return next(error);
    }
  }

  private createDepartment = async (request: RequestWithUser, response: Response, next: NextFunction)=>{
    try{
        response.status(200)
        response.send(this.fmt.formatResponse(await this.departmentService.createDepartment(request.body.name), Date.now() - request.startTime, "OK"))
    }
    catch (error){
        return next(error)
    }
  }

  private updateDepartment = async (request: RequestWithUser, response: Response, next: NextFunction)=>{
    try{
        response.status(200)
        response.send(this.fmt.formatResponse(await this.departmentService.updateDepartment(request.params.id,request.body.name), Date.now() - request.startTime, "OK"))
    }
    catch (error){
        return next(error)
    }
  }

  private deleteDepartment = async (request: RequestWithUser, response: Response, next: NextFunction)=>{
    try{
        response.status(200)
        response.send(this.fmt.formatResponse(await this.departmentService.deleteDepartment(request.params.id), Date.now() - request.startTime, "OK"))
    }
    catch (error){
        return next(error)
    }
  }
}

export default DepartmentController;
