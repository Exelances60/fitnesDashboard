import Customer from "../models/Customer";

class CustomerServices {
  async getCustomerByOwnerId(id: string) {
    try {
      const fetchedCustomer = await Customer.find({ ownerId: id }).populate({
        path: "coachPT",
        select: "name email phone profilePicture",
      });
      if (!fetchedCustomer) {
        throw new Error("Customer not found.");
      }
      return fetchedCustomer;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

const customerServices = new CustomerServices();

export default customerServices;
