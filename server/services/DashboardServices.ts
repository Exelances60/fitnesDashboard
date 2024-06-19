import { Request } from "express";
import { ProductServices } from "./ProductServices";
import { OrderServices } from "./OrderServices";
import { EmployeesServices } from "./EmployeesServices";
import { ISameMonth } from "../types/Order";
import { IOrder } from "../models/Order";
import { IProduct } from "../models/Product";

const mappedTotalSales = <T extends { createdAt: Date; totalPrice: number }>(
  data: T[],
  getValue: (value: T) => number
) => {
  const sameMonth: ISameMonth[] = data.reduce((acc, value) => {
    const date = new Date(value.createdAt).toLocaleString("tr-TR", {
      month: "2-digit",
      year: "numeric",
    });
    const monthSplit = date.split(" ")[0];
    const monthEntry = acc.find((month) => month.month === monthSplit);

    if (monthEntry) {
      monthEntry.total += value.totalPrice;
    } else {
      acc.push({ month: monthSplit, total: value.totalPrice });
    }
    return acc;
  }, [] as ISameMonth[]);

  return sameMonth;
};

const mappedTotalAmount = <T extends { createdAt: Date; amount: number }>(
  data: T[]
) => {
  const sameMonth: ISameMonth[] = data.reduce((acc, value) => {
    const date = new Date(value.createdAt).toLocaleString("tr-TR", {
      month: "2-digit",
      year: "numeric",
    });
    const monthSplit = date.split(" ")[0];
    const monthEntry = acc.find((month) => month.month === monthSplit);
    if (monthEntry) {
      monthEntry.total += 1;
    } else {
      acc.push({ month: monthSplit, total: 1 });
    }
    return acc;
  }, [] as ISameMonth[]);

  return sameMonth;
};

export class DashboardServices {
  private productServices: ProductServices;
  private orderServices: OrderServices;
  private employeesServices: EmployeesServices;

  constructor() {
    this.productServices = new ProductServices();
    this.orderServices = new OrderServices();
    this.employeesServices = new EmployeesServices();
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
          sameMonth = mappedTotalSales<IOrder>(chartData);
        }
        if (chartType === "orderAmount") {
          chartData = data.ordersWithProducts;
          sameMonth = mappedTotalAmount<IOrder>(chartData);
        }
        if (chartType === "orderSales") {
          chartData = data.ordersWithProducts;
          sameMonth = mappedTotalSales<IOrder>(chartData);
        }
      }
      if (chartType.includes("product")) {
        const data = await this.productServices.getProducts(req);
        if (chartType.includes("productAmount")) {
          chartData = data;
          sameMonth = mappedTotalAmount<IProduct>(chartData);
        }
        if (chartType.includes("productSales")) {
          chartData = data;
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
