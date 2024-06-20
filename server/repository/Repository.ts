import { Model, Types, UpdateQuery } from "mongoose";

export default class RepositoryBase<T extends Model<any>> {
  private model: T;

  constructor(model: T) {
    this.model = model;
  }

  async findById<T>(id: string): Promise<Model<T> & T> {
    try {
      const result = (await this.model.findById(id)) as T & Model<T>;
      if (!result) {
        throw new Error("Not found");
      }
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create<T>(data: T): Promise<T & Model<T>> {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update<T>(
    id: string | Types.ObjectId,
    data: UpdateQuery<T>
  ): Promise<T & Model<T>> {
    try {
      const result = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!result) {
        throw new Error("Not found");
      }
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(id: string | Types.ObjectId) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      if (!result) {
        throw new Error("Not found");
      }
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async findByIdWithPopulate(
    id: string,
    populateModel: string,
    populateField: string
  ) {
    try {
      const result = await this.model.findById(id).populate({
        path: `${populateModel}`,
        select: `${populateField}`,
      });
      if (!result) {
        throw new Error("Not found");
      }
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async find(query: any) {
    try {
      const result = await this.model.find(query);
      if (!result) {
        throw new Error("Not found");
      }
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async findOne<T>(query: any): Promise<T & Model<T>> {
    try {
      const result = await this.model.findOne(query);
      if (!result) {
        throw new Error("Not found");
      }
      return result;
    } catch (error: any) {
      return false as any;
    }
  }
}
