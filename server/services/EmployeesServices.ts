import { IEmployee } from "../models/Employees";
import { Request } from "express";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import throwValidationError from "../utils/err/throwValidationError";
import firebaseStorageServices from "../utils/FirebaseServices";
import { OwnerRepository } from "../repository/OwnerRepository";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import { IOwner } from "../models/Owner";
import { CustomerRepository } from "../repository/CustomerRepository";
import { ICustomer } from "../models/Customer";
import {
  IAssingCustomerRequest,
  IUpdateEmployeeRequest,
} from "../dto/EmployeesDTO";

export class EmployeesServices {
  private employeeRepository: EmployeeRepository;
  private customerRepository: CustomerRepository;
  private ownerRepository: OwnerRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
    this.ownerRepository = new OwnerRepository();
    this.customerRepository = new CustomerRepository();
  }
  /**
   * Creates a new employee.
   * @param req - The request object containing employee data.
   * @returns A promise that resolves to the created employee.
   * @throws An error if there is any issue during the creation process.
   */
  async createEmployee(req: Request): Promise<IEmployee> {
    try {
      if (!req.files)
        return throwValidationError("Profile picture is required");
      const downloadURLProfilePicture =
        await firebaseStorageServices.uploadImageToStorage(
          req.files[0],
          "employees/"
        );
      let dowlandsDocuments: string[] = [];
      if (req.files.length > 1) {
        dowlandsDocuments = await Promise.all(
          req.files
            .filter((file) => {
              if (file.fieldname === "documents") {
                return file.originalname;
              }
            })
            .map(async (file) => {
              return await firebaseStorageServices.uploadImageToStorage(
                file,
                "empDocument/"
              );
            })
        );
      }
      const employee = await this.employeeRepository.create<IEmployee>({
        ...req.body,
        profilePicture: downloadURLProfilePicture,
        documents: dowlandsDocuments,
        customers: [],
      });
      const fetchedOwner = await this.ownerRepository.findById<IOwner>(
        req.body.ownerId
      );
      if (!fetchedOwner) return throwNotFoundError("Owner not found");
      fetchedOwner.employees.push(employee._id);
      await this.ownerRepository.update<IOwner>(fetchedOwner._id, fetchedOwner);
      return employee;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  /**
   * Retrieves the employees associated with the specified owner.
   * @param ownerId - The ID of the owner.
   * @returns A promise that resolves to an array of employees.
   * @throws If an error occurs while retrieving the employees.
   */
  async getEmployees(ownerId: string): Promise<IEmployee[]> {
    try {
      const fetchedEmployee = await this.employeeRepository.find({
        ownerId: ownerId,
      });
      return Promise.all(
        fetchedEmployee.map(async (employee) => {
          return await employee.populate(
            "customers",
            "name email phone profilePicture"
          );
        })
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async assignCustomer(req: IAssingCustomerRequest): Promise<void> {
    try {
      const employee = await this.employeeRepository.findById<IEmployee>(
        req.body.employeeId
      );
      if (!employee) return throwNotFoundError("Employee not found");
      const customer = await this.customerRepository.findById<ICustomer>(
        req.body.customerId
      );
      if (!customer) return throwNotFoundError("Customer not found");
      if (!employee.customers) {
        employee.customers = [];
      }

      if (employee.customers.includes(req.body.customerId as any)) {
        return throwValidationError(
          "Customer already assigned to this employee"
        );
      }
      employee.customers.push(req.body.customerId as any);

      await this.employeeRepository.update<IEmployee>(employee._id, employee);
      await this.customerRepository.update<ICustomer>(customer._id, {
        coachPT: employee._id,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async updateEmployee(req: IUpdateEmployeeRequest): Promise<void> {
    try {
      if (!req.body.id) return throwValidationError("Employee id is required");
      const fetchedEmployee = await this.employeeRepository.update(
        req.body.id,
        req.body
      );
      if (!fetchedEmployee) return throwNotFoundError("Employee not found");
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async deleteEmployee(req: Request): Promise<void> {
    try {
      const employee = await this.employeeRepository.findById<IEmployee>(
        req.params.employeeId
      );
      if (!employee) return throwNotFoundError("Employee not found");
      if (employee.customers.length > 0) {
        const customers = await this.customerRepository.find({
          coachPT: employee._id,
        });
        if (!customers) return throwNotFoundError("Customers not found");
        customers.forEach(async (customer) => {
          await this.customerRepository.update<ICustomer>(customer._id, {
            coachPT: null,
          });
        });
      }
      if (employee.profilePicture) {
        firebaseStorageServices.deleteImageFromStorage(employee.profilePicture);
      }
      employee.documents.forEach((document) => {
        firebaseStorageServices.deleteImageFromStorage(document);
      });
      await this.employeeRepository.delete(employee._id);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
