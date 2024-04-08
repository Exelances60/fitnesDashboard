import { Request } from "express";
import { OwnerRepository } from "../repository/OwnerRepository";
import firebaseStorageServices from "../utils/FirebaseServices";
import { CustomerRepository } from "../repository/CustomerRepository";
import { ICustomer } from "../models/Customer";
import { IOwner } from "../models/Owner";
import { ExerciseRepository } from "../repository/ExersiceRepository";
import { IExercise } from "../models/Exercise";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import throwBadRequestError from "../utils/err/throwBadRequestError";
import { CalendarActRepository } from "../repository/CalendarActRepository";
import { ICalenderAcv } from "../models/CalenderAcv";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import { IEmployee } from "../models/Employees";
import { ObjectId } from "mongoose";
import {
  IDeleteCustomerExercisePlanRequestDTO,
  IUpdateCustomerExercisePlanRequestDTO,
  IUpdateCustomerRequestDTO,
} from "../dto/CustomerDTO";

export class CustomerServices {
  private customerRepository: CustomerRepository;
  private ownerRepository: OwnerRepository;
  private exerciseRepository: ExerciseRepository;
  private calendarAcvRepository: CalendarActRepository;
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.ownerRepository = new OwnerRepository();
    this.exerciseRepository = new ExerciseRepository();
    this.calendarAcvRepository = new CalendarActRepository();
    this.employeeRepository = new EmployeeRepository();
  }

  /**
   * Retrieves a customer by their ID.
   * @param _id - The ID of the customer to retrieve.
   * @returns A Promise that resolves to the customer object if found, or throws an error if not found.
   */
  async getCustomer(_id: string) {
    try {
      const customer = await this.customerRepository.findOwnerIdWithPopulate(
        _id
      );
      if (!customer) return throwNotFoundError("Customer not found");

      return customer;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  /**
   * Adds a new customer.
   * @param req - The request object containing the customer data.
   * @returns The saved customer object.
   * @throws Error if there is an error while adding the customer.
   */
  async addCustomer(req: Request) {
    try {
      const { coach, ownerId } = req.body;
      const fetchedOwner = (await this.ownerRepository.findById<IOwner>(
        ownerId
      )) as IOwner;

      if (!fetchedOwner) return throwNotFoundError("Owner not found");

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
      await fetchedOwner.save();
      return savedCustomer;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Updates a customer based on the provided request.
   * @param req - The request object containing the necessary data for updating the customer.
   * @returns The updated customer object.
   * @throws Error if any error occurs during the update process.
   */
  async updateCustomer(req: IUpdateCustomerRequestDTO) {
    try {
      const fetchedOwner = await this.ownerRepository.findById<IOwner>(
        req.body.ownerId
      );
      if (!fetchedOwner) return throwNotFoundError("Owner not found");

      if (!fetchedOwner.customer.includes(req.body._id as any))
        return throwBadRequestError("Customer not found in owner's list");

      const customer = await this.customerRepository.findById<ICustomer>(
        req.body._id
      );
      if (!customer) return throwNotFoundError("Customer not found");

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

  /**
   * Deletes a customer from the database.
   * @param customerId - The ID of the customer to delete.
   * @throws Error if the customer or owner is not found, or if there is an error during the deletion process.
   */
  async deleteCustomer(customerId: string): Promise<void> {
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
  /**
   * Finds a customer by their ID and retrieves their information along with related exercise details.
   * @param customerId - The ID of the customer to find.
   * @returns The customer information along with their exercise details.
   * @throws Error if there is an error during the process.
   */
  async findCustomer(customerId: string) {
    try {
      const fetchedCustomer = await this.customerRepository.findById<ICustomer>(
        customerId
      );

      if (!fetchedCustomer) return throwNotFoundError("Customer not found");

      await fetchedCustomer.populate("calendarAcv", "date text type color _id");
      await fetchedCustomer.populate(
        "coachPT",
        "name email phone profilePicture position"
      );

      const fetchedExersice = await this.exerciseRepository.find({
        name: fetchedCustomer.exercisePlan,
      });
      if (!fetchedExersice) return throwNotFoundError("Exercise not found");
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
  /**
   * Deletes an exercise plan from a customer's list of exercise plans.
   * @param req - The request object containing the customer ID and exercise name.
   * @throws {BadRequestError} If the customer ID is not found in the request body.
   * @throws {NotFoundError} If the customer is not found in the database.
   * @throws {Error} If any other error occurs during the deletion process.
   */
  async deleteCustomerExercisePlan(req: IDeleteCustomerExercisePlanRequestDTO) {
    try {
      if (!req.body.customerId)
        return throwBadRequestError("Customer id not found");
      const fetchedCustomer = await this.customerRepository.findById<ICustomer>(
        req.body.customerId
      );
      if (!fetchedCustomer) return throwNotFoundError("Customer not found");
      const deleteExersice = fetchedCustomer.exercisePlan.filter(
        (exersice) => exersice !== req.body.exerciseName
      ) as string[];
      fetchedCustomer.exercisePlan = deleteExersice;
      await fetchedCustomer.updateOne(fetchedCustomer);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Updates the exercise plan for a customer.
   * @param req - The request object containing the customer ID and new exercise plan.
   * @throws Error if there is an error updating the customer's exercise plan.
   */
  async updateCustomerExercisePlan(req: IUpdateCustomerExercisePlanRequestDTO) {
    try {
      const fetchedCustomer = await this.customerRepository.findById<ICustomer>(
        req.body.customerId
      );
      if (!fetchedCustomer) return throwNotFoundError("Customer not found");

      const notFoundExercises = req.body.exerciseName.filter(
        (exercise) =>
          !(fetchedCustomer.exercisePlan as string[]).includes(exercise)
      ) as string[];

      fetchedCustomer.exercisePlan = [
        ...fetchedCustomer.exercisePlan,
        ...notFoundExercises,
      ] as string[];
      await fetchedCustomer.updateOne(fetchedCustomer);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  /**
   * Adds a customer activity.
   * @param req - The request object containing the activity details.
   * @returns A promise that resolves to the created customer activity.
   * @throws An error if there is an issue adding the customer activity.
   */
  async addCustomerActivity(req: Request): Promise<ICalenderAcv> {
    try {
      const { planText, planType, customerId } = req.body;
      const fetchedCustomer = await this.customerRepository.findById<ICustomer>(
        customerId
      );
      if (!fetchedCustomer) return throwNotFoundError("Customer not found");
      const savedActivity =
        await this.calendarAcvRepository.create<ICalenderAcv>({
          text: planText,
          type: planType,
          customerId,
          ...req.body,
        });
      fetchedCustomer.calendarAcv.push(savedActivity._id);
      await fetchedCustomer.updateOne(fetchedCustomer);
      return savedActivity;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  /**
   * Deletes a customer's coach and updates the corresponding records.
   * @param customerId - The ID of the customer to delete the coach for.
   * @returns A promise that resolves to undefined.
   * @throws Error if there is an error during the deletion process.
   */
  async deleteCustomerCoach(customerId: string): Promise<undefined> {
    try {
      const fetchedCustomer = await this.customerRepository.findById<ICustomer>(
        customerId
      );
      if (!fetchedCustomer) return throwNotFoundError("Customer not found");
      if (!fetchedCustomer.coachPT)
        return throwBadRequestError("Customer does not have a coach");

      const fetchedEmployee = await this.employeeRepository.findById<IEmployee>(
        fetchedCustomer.coachPT.toString()
      );
      if (!fetchedEmployee) return throwNotFoundError("Employee not found");

      const removeCustomerArray = fetchedEmployee.customers.filter(
        (cust) => cust.toString() !== customerId.toString()
      ) as ObjectId[];
      fetchedEmployee.customers = removeCustomerArray;
      await fetchedEmployee.updateOne(fetchedEmployee);
      fetchedCustomer.coachPT = null;
      await fetchedCustomer.updateOne(fetchedCustomer);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
