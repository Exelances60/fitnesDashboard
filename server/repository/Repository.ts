import { Model, UpdateQuery } from "mongoose";

export default class RepositoryBase<T extends Model<any>> {
  private model: T;

  constructor(model: T) {
    this.model = model;
  }

  async findById<T>(id: string): Promise<T> {
    const result = await this.model.findById(id);
    if (!result) {
      throw new Error("Not found");
    }
    return result;
  }

  async create<T>(data: T): Promise<T> {
    const result = await this.model.create(data);
    return result;
  }

  async update<T>(id: string, data: UpdateQuery<T>) {
    const result = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!result) {
      throw new Error("Not found");
    }
    return result;
  }

  async delete(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Not found");
    }
    return result;
  }
  async findByIdWithPopulate(
    id: string,
    populateModel: string,
    populateField: string
  ) {
    const result = await this.model.findById(id).populate({
      path: `${populateModel}`,
      select: `${populateField}`,
    });
    if (!result) {
      throw new Error("Not found");
    }
    return result;
  }
}
