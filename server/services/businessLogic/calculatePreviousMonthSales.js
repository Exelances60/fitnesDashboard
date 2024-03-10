const calculateCurrentMonthSales = (ordersWithProducts) => {
  const currentDate = new Date();
  return ordersWithProducts
    .filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === currentDate.getMonth();
    })
    .reduce((acc, order) => acc + order.totalPrice, 0);
};

const calculatePreviousMonthSales = (ordersWithProducts) => {
  const currentDate = new Date();
  let previousMonthSales = ordersWithProducts
    .filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() < currentDate.getMonth();
    })
    .reduce((acc, order) => acc + order.totalPrice, 0);

  previousMonthSales = previousMonthSales === 0 ? 1 : previousMonthSales;

  const currentMonthSales = calculateCurrentMonthSales(ordersWithProducts);
  return ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
};

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

const calculateCurrentComplateSales = (ordersWithProducts) => {
  const currentDate = new Date();
  return ordersWithProducts
    .filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getMonth() === currentDate.getMonth() &&
        order.status === "Completed"
      );
    })
    .reduce((acc, order) => acc + order.totalPrice, 0);
};

const calculatePreviosMonthComplateSales = (ordersWithProducts) => {
  const currentDate = new Date();
  let previousMonthCompletedSales = ordersWithProducts
    .filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getMonth() < currentDate.getMonth() &&
        order.status === "Completed"
      );
    })
    .reduce((acc, order) => acc + order.totalPrice, 0);
  const currentMonthCompletedSales =
    calculateCurrentComplateSales(ordersWithProducts);

  previousMonthCompletedSales =
    previousMonthCompletedSales === 0 ? 1 : previousMonthCompletedSales;

  return currentMonthCompletedSales === 0
    ? 0
    : ((currentMonthCompletedSales - previousMonthCompletedSales) /
        previousMonthCompletedSales) *
        100;
};

module.exports = {
  calculatePreviousMonthSales,
  calculatePreviousMonthAmount,
  calculatePreviosMonthComplateSales,
};
