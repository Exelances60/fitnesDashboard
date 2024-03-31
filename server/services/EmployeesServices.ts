import { IEmployee } from "../models/Employees";
import { Request } from "express";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import throwValidationError from "../utils/err/throwValidationError";
import firebaseStorageServices from "../utils/FirebaseServices";
import { OwnerRepository } from "../repository/OwnerRepository";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import { IOwner } from "../models/Owner";

export class EmployeesServices {
  private employeeRepository: EmployeeRepository;
  private ownerRepository: OwnerRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
    this.ownerRepository = new OwnerRepository();
  }
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
}
