import { Request } from "express";
import { ProductServices } from "./ProductServices";
import { OrderServices } from "./OrderServices";
import { EmployeesServices } from "./EmployeesServices";
import { ISameMonth } from "../types/Order";
import { IOrder } from "../models/Order";
import { IProduct } from "../models/Product";
import { IEmployee } from "../models/Employees";
import { CustomerServices } from "./CustomerServices";
import { ICustomer } from "../models/Customer";

const mappedTotal = <
  T extends { createdAt: Date; totalPrice?: number; amount?: number }
>(
  data: T[],
  getFilter: (value: T) => any,
  getValueFuc: (value: T) => number
) => {
  const sameMonth: ISameMonth[] = data.reduce((acc, value) => {
    const date = new Date(getFilter(value)).toLocaleDateString("en-US", {
      month: "2-digit",
      year: "numeric",
    });
    const monthSplit = date.split(" ")[0];
    const monthEntry = acc.find((month) => month.month === monthSplit);
    const getValue = getValueFuc(value);
    if (monthEntry) {
      monthEntry.total += getValue;
    } else {
      acc.push({ month: monthSplit, total: getValue });
    }
    return acc;
  }, [] as ISameMonth[]);

  return sameMonth;
};

export class DashboardServices {
  private productServices: ProductServices;
  private orderServices: OrderServices;
  private employeesServices: EmployeesServices;
  private customerServices: CustomerServices;

  constructor() {
    this.productServices = new ProductServices();
    this.orderServices = new OrderServices();
    this.employeesServices = new EmployeesServices();
    this.customerServices = new CustomerServices();
  }

  async getDashboard(req: Request) {
    try {
      const products = (await this.productServices.getProducts(req)).length;
      const orders = await this.orderServices.getOrders(req);
      const totalOrders = orders.ordersWithProducts.length;
      const totalCompletedOrders = orders.ordersWithProducts.filter(
        (order) => order.status === "Completed"
      ).length;
      const employees = (
        await this.employeesServices.getEmployees(req.userId as string)
      ).length;
      return {
        products,
        totalOrders,
        totalCompletedOrders,
        employees,
      };
    } catch (error) {
      throw error;
    }
  }

  async getCharts(req: Request) {
    try {
      const chartType = req.params.chartType;
      let chartData;
      let sameMonth: ISameMonth[] = [];

      if (chartType.includes("order")) {
        const data = await this.orderServices.getOrders(req);
        if (chartType === "orderCompleted") {
          chartData = data.ordersWithProducts.filter(
            (order) => order.status === "Completed"
          );
          sameMonth = mappedTotal<IOrder>(
            chartData,
            (order) => order.createdAt,
            (order) => order.totalPrice
          );
        }
        if (chartType === "orderAmount") {
          chartData = data.ordersWithProducts;
          sameMonth = mappedTotal<IOrder>(
            chartData,
            (order) => order.createdAt,
            (order) => 1
          );
        }
        if (chartType === "orderSales") {
          chartData = data.ordersWithProducts;
          sameMonth = mappedTotal<IOrder>(
            chartData,
            (order) => order.createdAt,
            (order) => order.totalPrice
          );
        }
      }

      if (chartType.includes("product")) {
        const data = await this.productServices.getProducts(req);
        if (chartType.includes("productAmount")) {
          chartData = data;
          sameMonth = mappedTotal<IProduct>(
            chartData,
            (product) => product.createdAt,
            (product) => 1
          );
        }
        if (chartType.includes("productStock")) {
          chartData = data;
          sameMonth = mappedTotal<IProduct>(
            chartData,
            (product) => product.createdAt,
            (product) => product.amount
          );
        }
      }

      if (chartType.includes("employee")) {
        const data = await this.employeesServices.getEmployees(
          req.userId as string
        );

        if (chartType.includes("employeeAmount")) {
          chartData = data;
          sameMonth = mappedTotal<IEmployee>(
            chartData,
            (employee) => employee.hireDate,
            (employee) => 1
          );
        }

        if (chartType.includes("employeeSalary")) {
          chartData = data;
          sameMonth = mappedTotal<IEmployee>(
            chartData,
            (employee) => employee.hireDate,
            (employee) => employee.salary
          );
        }
      }

      if (chartType.includes("customer")) {
        const data = await this.customerServices.getCustomer(
          req.userId as string
        );
        if (chartType.includes("customerAmount")) {
          chartData = data;
          sameMonth = mappedTotal<ICustomer>(
            chartData,
            (customer) => customer.createdAt,
            (customer) => 1
          );
        }
        if (chartType.includes("customerSales")) {
          chartData = data;
          sameMonth = mappedTotal<ICustomer>(
            chartData,
            (customer) => customer.createdAt,
            (customer) => customer.membershipPrice
          );
        }
      }

      return sameMonth.sort((a, b) => {
        return parseInt(a.month) - parseInt(b.month);
      });
    } catch (error) {
      throw error;
    }
  }
}
