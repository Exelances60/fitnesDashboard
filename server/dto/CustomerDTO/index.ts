import { Request } from "express";

export interface IUpdateCustomerRequestDTO extends Request {
  body: {
    name: string;
    email: string;
    phone: string;
    age: number;
    bodyWeight: number;
    height: number;
    membershipMonths: number;
    membershipPrice: number;
    membershipStatus: string;
    membershipType: number;
    _id: string;
    ownerId: string;
  };
}

export interface IDeleteCustomerExercisePlanRequestDTO extends Request {
  body: {
    customerId: string;
    exerciseName: string;
  };
}

export interface IUpdateCustomerExercisePlanRequestDTO extends Request {
  body: {
    exerciseName: string[];
    customerId: string;
  };
}

export interface IAddCustomerAcvRequestDTO extends Request {
  body: {
    planType: string;
    planText: string;
    color: string;
    date: string;
    customerId: any;
  };
}
