import Employee from "../models/Employees";
import RepositoryBase from "./Repository";

export class EmployeeRepository extends RepositoryBase<typeof Employee> {
  constructor() {
    super(Employee);
  }
}
