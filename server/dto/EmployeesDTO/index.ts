import { Request } from "express";

export interface IAssingCustomerRequest extends Request {
  body: {
    employeeId: string;
    customerId: string;
  };
}

export interface IUpdateEmployeeRequest extends Request {
  body: {
    name: string;
    phone: number;
    email: string;
    age: number;
    position: string;
    address: string;
    hireDate: string;
    salary: number;
    university: string;
    education: string;
    id: string;
  };
}
