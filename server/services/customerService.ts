import { Request } from "express";
import { OwnerRepository } from "../repository/OwnerRepository";
import firebaseStorageServices from "../utils/FirebaseServices";
import { CustomerRepository } from "../repository/CustomerRepository";
import { ICustomer } from "../models/Customer";
import { IOwner } from "../models/Owner";

export class CustomerServices {
  private customerRepository: CustomerRepository;
  private ownerRepository: OwnerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.ownerRepository = new OwnerRepository();
  }

  async getCustomer(_id: string) {
    try {
      const customer = await this.customerRepository.findOwnerIdWithPopulate(
        _id,
        "coachPT",
        "name email phone profilePicture"
      );
      if (!customer) {
        throw new Error("Customer not found");
      }
      return customer;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  async addCustomer(req: Request) {
    try {
      const { coach, ownerId } = req.body;
      const fetchedOwner = (await this.ownerRepository.findById<IOwner>(
        ownerId
      )) as IOwner;

      if (!fetchedOwner) {
        throw new Error("Owner not found");
      }
      const downloadURL = await firebaseStorageServices.uploadImageToStorage(
        req.file as Express.Multer.File,
        "customers/"
      );

      const savedCustomer = await this.customerRepository.create<ICustomer>({
        ...req.body,
        coachPT: coach || null,
        age: +req.body.age,
        bodyWeight: +req.body.bodyWeight,
        height: +req.body.height,
        membershipPrice: +req.body.membershipPrice,
        membershipStartDate: new Date(),
        membershipEndDate: new Date(
          new Date().setMonth(
            new Date().getMonth() + +req.body.membershipMonths
          )
        ),
        membershipType: req.body.membershipMonths,
        exercisePlan: [],
        profilePicture: downloadURL,
        parentPhone: req.body.parentPhone ? req.body.parentPhone : null,
      });
      fetchedOwner.customer.push(savedCustomer._id);
      return savedCustomer;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
