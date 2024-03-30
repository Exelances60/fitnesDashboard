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
  async findByIdWithDoublePopulate(
    id: string,
    populateModel1: string,
    populateField1: string,
    populateModel2: string,
    populateField2: string
  ) {
    try {
      const result = await Customer.findById(id)
        .populate({
          path: populateModel1,
          select: populateField1,
        })
        .populate({
          path: populateModel2,
          select: populateField2,
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
