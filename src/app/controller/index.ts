/**
 * Wraps Controllers for easy import from other modules
 */
import HealthController from "./HealthController";
import EmployeeController from "./EmployeeController";
import DepartmentController from './DepartmentController'
import { EmployeeService } from "../service/EmployeeService";
import { DepartmentService } from "../service/DepartmentService";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import { DepartmentRepository } from "../repository/DepartmentRepository";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRepository())),
  new DepartmentController(new DepartmentService(new DepartmentRepository()))
];
