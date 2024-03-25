import { Document, Model, UpdateQuery } from "mongoose";
import { IDataBaseServices } from "../../interfaces/IDataBaseServices";

export class MongoDBDatabase implements IDataBaseServices {
  private readonly model: Model<Document>;
  constructor(model: Model<Document>) {
    this.model = model;
  }

  async findByIdUpdate<T extends Document>(
    id: string,
    data: UpdateQuery<T>
  ): Promise<T | null> {
    try {
      const result = (await this.model.findOneAndUpdate({ _id: id }, data, {
        new: true,
      })) as T;
      if (!result) {
        throw new Error("Data not found");
      }
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async findById<T extends Document>(id: string): Promise<T> {
    try {
      const result = (await this.model.findById(id)) as T;
      if (!result) {
        throw new Error("Data not found");
      }
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async create<T extends Document>(data: T): Promise<T> {
    try {
      const result = (await this.model.create(data)) as T;
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async delete(id: string): Promise<Object> {
    try {
      const result = await this.model.deleteOne({ _id: id });
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async findAll<T extends Document>(): Promise<T[]> {
    try {
      const result = (await this.model.find()) as T[];
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
