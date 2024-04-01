import { IEmployee } from "../models/Employees";
import { Request } from "express";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import throwValidationError from "../utils/err/throwValidationError";
import firebaseStorageServices from "../utils/FirebaseServices";
import { OwnerRepository } from "../repository/OwnerRepository";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import { IOwner } from "../models/Owner";
import { Model } from "mongoose";

export class EmployeesServices {
  private employeeRepository: EmployeeRepository;
  private ownerRepository: OwnerRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
    this.ownerRepository = new OwnerRepository();
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
      await fetchedOwner.save();
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
}
