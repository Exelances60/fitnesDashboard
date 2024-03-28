import RepositoryBase from "./Repository";
import Customer from "../models/Customer";

export class CustomerRepository extends RepositoryBase<typeof Customer> {
  constructor() {
    super(Customer);
  }
  async findOwnerIdWithPopulate(
    id: string,
    populateModel: string,
    populateField: string
  ) {
    try {
      const result = await Customer.find({ ownerId: id }).populate({
        path: populateModel,
        select: populateField,
      });
      if (!result) {
        throw new Error("Not found");
      }
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
