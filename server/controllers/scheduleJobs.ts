import Owner from "../models/Owner";
import Order from "../models/Order";

export const scheduleJobs = async () => {
  const owners = await Owner.find();
  const orders = await Order.find();
  owners.forEach((owner) => {
    const ownerOrders = orders
      .filter((order) => order.creator.toString() === owner._id.toString())
      .map((order) => order._id);

    owner.orders = ownerOrders;
    owner.save();
    console.log("Orders added to owner");
  });
};
