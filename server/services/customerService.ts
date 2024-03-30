import { Request } from "express";
import { OwnerRepository } from "../repository/OwnerRepository";
import firebaseStorageServices from "../utils/FirebaseServices";
import { CustomerRepository } from "../repository/CustomerRepository";
import { ICustomer } from "../models/Customer";
import { IOwner } from "../models/Owner";
import { ExerciseRepository } from "../repository/ExersiceRepository";
import { IExercise } from "../models/Exercise";

export class CustomerServices {
  private customerRepository: CustomerRepository;
  private ownerRepository: OwnerRepository;
  private exerciseRepository: ExerciseRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.ownerRepository = new OwnerRepository();
    this.exerciseRepository = new ExerciseRepository();
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
        membershipType: +req.body.membershipMonths,
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

  async updateCustomer(req: Request) {
    try {
      const fetchedOwner = await this.ownerRepository.findById<IOwner>(
        req.body.ownerId
      );
      if (!fetchedOwner) {
        throw new Error("Owner not found");
      }
      if (!fetchedOwner.customer.includes(req.body._id)) {
        throw new Error("Customer not found");
      }
      const customer = await this.customerRepository.findById<ICustomer>(
        req.body._id
      );
      if (!customer) {
        throw new Error("Customer not found");
      }
      const updatedCustomer = await this.customerRepository.update<ICustomer>(
        req.body._id,
        {
          ...req.body,
          membershipType: +req.body.membershipMonths,
        }
      );
      return updatedCustomer;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteCustomer(customerId: string) {
    try {
      const customer = await this.customerRepository.findById<ICustomer>(
        customerId
      );
      if (!customer) {
        throw new Error("Customer not found");
      }
      const ownerId = customer.ownerId.toString();
      const fetchedOwner = await this.ownerRepository.findById<IOwner>(ownerId);
      if (!fetchedOwner) {
        throw new Error("Owner not found");
      }
      fetchedOwner.customer.filter(
        (cust) => cust.toString() !== customerId.toString()
      );
      await fetchedOwner.save();
      firebaseStorageServices.deleteImageFromStorage(customer.profilePicture);
      await customer.deleteOne();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async findCustomer(customerId: string) {
    try {
      const fetchedCustomer = await this.customerRepository.findById<ICustomer>(
        customerId
      );
      if (!fetchedCustomer) {
        throw new Error("Customer not found");
      }
      await fetchedCustomer.populate("calendarAcv", "title");
      await fetchedCustomer.populate(
        "coachPT",
        "name email phone profilePicture position"
      );

      const fetchedExersice = await this.exerciseRepository.find({
        name: fetchedCustomer.exercisePlan,
      });

      const exerciseNames = fetchedExersice.map((exercise) => {
        return {
          bodyPart: exercise.bodyPart,
          equipment: exercise.equipment,
          gifUrl: exercise.gifUrl,
          name: exercise.name,
          secondaryMuscle: exercise.secondaryMuscle,
          instructions: exercise.instructions,
        };
      }) as IExercise[];

      const responseCustomer = {
        _id: fetchedCustomer._id,
        age: fetchedCustomer.age,
        bodyWeight: fetchedCustomer.bodyWeight,
        height: fetchedCustomer.height,
        membershipPrice: fetchedCustomer.membershipPrice,
        membershipStartDate: fetchedCustomer.membershipStartDate,
        membershipEndDate: fetchedCustomer.membershipEndDate,
        membershipType: fetchedCustomer.membershipType,
        exercisePlan: exerciseNames,
        profilePicture: fetchedCustomer.profilePicture,
        parentPhone: fetchedCustomer.parentPhone,
        coachPT: fetchedCustomer.coachPT,
        calendarAcv: fetchedCustomer.calendarAcv,
        membershipStatus: fetchedCustomer.membershipStatus,
        name: fetchedCustomer.name,
        phone: fetchedCustomer.phone,
        email: fetchedCustomer.email,
        address: fetchedCustomer.address,
        bloodGroup: fetchedCustomer.bloodGroup,
      };
      return responseCustomer;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
