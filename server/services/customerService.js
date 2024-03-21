const Customer = require("../models/Customer");

class CustomerServices {
  async getCustomerByOwnerId(id) {
    try {
      const fetchedCustomer = await Customer.find({ ownerId: id }).populate({
        path: "coachPT",
        select: "name email phone profilePicture",
      });
      if (!fetchedCustomer) {
        throw new Error("Customer not found.");
      }
      return fetchedCustomer;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const customerServices = new CustomerServices();

module.exports = customerServices;
