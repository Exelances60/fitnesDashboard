"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardServices = void 0;
const ProductServices_1 = require("./ProductServices");
const OrderServices_1 = require("./OrderServices");
const EmployeesServices_1 = require("./EmployeesServices");
const CustomerServices_1 = require("./CustomerServices");
const mappedTotal = (data, getFilter, getValueFuc) => {
    const sameMonth = data.reduce((acc, value) => {
        const date = new Date(getFilter(value)).toLocaleDateString("en-US", {
            month: "2-digit",
            year: "numeric",
        });
        const monthSplit = date.split(" ")[0];
        const monthEntry = acc.find((month) => month.month === monthSplit);
        const getValue = getValueFuc(value);
        if (monthEntry) {
            monthEntry.total += getValue;
        }
        else {
            acc.push({ month: monthSplit, total: getValue });
        }
        return acc;
    }, []);
    return sameMonth;
};
class DashboardServices {
    constructor() {
        this.productServices = new ProductServices_1.ProductServices();
        this.orderServices = new OrderServices_1.OrderServices();
        this.employeesServices = new EmployeesServices_1.EmployeesServices();
        this.customerServices = new CustomerServices_1.CustomerServices();
    }
    async getDashboard(req) {
        try {
            const products = (await this.productServices.getProducts(req)).length;
            const orders = await this.orderServices.getOrders(req);
            const totalOrders = orders.ordersWithProducts.length;
            const totalCompletedOrders = orders.ordersWithProducts.filter((order) => order.status === "Completed").length;
            const employees = (await this.employeesServices.getEmployees(req.userId)).length;
            return {
                products,
                totalOrders,
                totalCompletedOrders,
                employees,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getCharts(req) {
        try {
            const chartType = req.params.chartType;
            let chartData;
            let sameMonth = [];
            if (chartType.includes("order")) {
                const data = await this.orderServices.getOrders(req);
                if (chartType === "orderCompleted") {
                    chartData = data.ordersWithProducts.filter((order) => order.status === "Completed");
                    sameMonth = mappedTotal(chartData, (order) => order.createdAt, (order) => order.totalPrice);
                }
                if (chartType === "orderAmount") {
                    chartData = data.ordersWithProducts;
                    sameMonth = mappedTotal(chartData, (order) => order.createdAt, (order) => 1);
                }
                if (chartType === "orderSales") {
                    chartData = data.ordersWithProducts;
                    sameMonth = mappedTotal(chartData, (order) => order.createdAt, (order) => order.totalPrice);
                }
            }
            if (chartType.includes("product")) {
                const data = await this.productServices.getProducts(req);
                if (chartType.includes("productAmount")) {
                    chartData = data;
                    sameMonth = mappedTotal(chartData, (product) => product.createdAt, (product) => 1);
                }
                if (chartType.includes("productStock")) {
                    chartData = data;
                    sameMonth = mappedTotal(chartData, (product) => product.createdAt, (product) => product.amount);
                }
            }
            if (chartType.includes("employee")) {
                const data = await this.employeesServices.getEmployees(req.userId);
                if (chartType.includes("employeeAmount")) {
                    chartData = data;
                    sameMonth = mappedTotal(chartData, (employee) => employee.hireDate, (employee) => 1);
                }
                if (chartType.includes("employeeSalary")) {
                    chartData = data;
                    sameMonth = mappedTotal(chartData, (employee) => employee.hireDate, (employee) => employee.salary);
                }
            }
            if (chartType.includes("customer")) {
                const data = await this.customerServices.getCustomer(req.userId);
                if (chartType.includes("customerAmount")) {
                    chartData = data;
                    sameMonth = mappedTotal(chartData, (customer) => customer.createdAt, (customer) => 1);
                }
                if (chartType.includes("customerSales")) {
                    chartData = data;
                    sameMonth = mappedTotal(chartData, (customer) => customer.createdAt, (customer) => customer.membershipPrice);
                }
            }
            return sameMonth.sort((a, b) => {
                return parseInt(a.month) - parseInt(b.month);
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.DashboardServices = DashboardServices;
//# sourceMappingURL=DashboardServices.js.map