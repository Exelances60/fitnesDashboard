"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePreviosMonthComplateSales = exports.calculateCurrentComplateSales = exports.calculateCurrentMonthAmount = exports.calculatePreviousMonthAmount = exports.calculatePreviousMonthSales = exports.calculateCurrentMonthSales = void 0;
const calculateCurrentMonthSales = (ordersWithProducts) => {
    const currentDate = new Date();
    return ordersWithProducts
        .filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === currentDate.getMonth();
    })
        .reduce((acc, order) => acc + order.totalPrice, 0);
};
exports.calculateCurrentMonthSales = calculateCurrentMonthSales;
const calculatePreviousMonthSales = (ordersWithProducts) => {
    const currentDate = new Date();
    let previousMonthSales = ordersWithProducts
        .filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() < currentDate.getMonth();
    })
        .reduce((acc, order) => acc + order.totalPrice, 0);
    previousMonthSales = previousMonthSales === 0 ? 1 : previousMonthSales;
    const currentMonthSales = (0, exports.calculateCurrentMonthSales)(ordersWithProducts);
    return ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
};
exports.calculatePreviousMonthSales = calculatePreviousMonthSales;
/*
  @description:   geçmiş ayın sipariş adenini hesaplar
*/
const calculatePreviousMonthAmount = (ordersWithProducts) => {
    const currentDate = new Date();
    return ordersWithProducts.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() < currentDate.getMonth();
    }).length;
};
exports.calculatePreviousMonthAmount = calculatePreviousMonthAmount;
const calculateCurrentMonthAmount = (ordersWithProducts) => {
    const currentDate = new Date();
    return ordersWithProducts.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === currentDate.getMonth();
    }).length;
};
exports.calculateCurrentMonthAmount = calculateCurrentMonthAmount;
const calculateCurrentComplateSales = (ordersWithProducts) => {
    const currentDate = new Date();
    return ordersWithProducts
        .filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (orderDate.getMonth() === currentDate.getMonth() &&
            order.status === "Completed");
    })
        .reduce((acc, order) => acc + order.totalPrice, 0);
};
exports.calculateCurrentComplateSales = calculateCurrentComplateSales;
const calculatePreviosMonthComplateSales = (ordersWithProducts) => {
    const currentDate = new Date();
    let previousMonthCompletedSales = ordersWithProducts
        .filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (orderDate.getMonth() < currentDate.getMonth() &&
            order.status === "Completed");
    })
        .reduce((acc, order) => acc + order.totalPrice, 0);
    const currentMonthCompletedSales = (0, exports.calculateCurrentComplateSales)(ordersWithProducts);
    previousMonthCompletedSales =
        previousMonthCompletedSales === 0 ? 1 : previousMonthCompletedSales;
    return currentMonthCompletedSales === 0
        ? 0
        : ((currentMonthCompletedSales - previousMonthCompletedSales) /
            previousMonthCompletedSales) *
            100;
};
exports.calculatePreviosMonthComplateSales = calculatePreviosMonthComplateSales;
//# sourceMappingURL=calculatePreviousMonthSales.js.map