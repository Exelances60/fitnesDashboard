import { Document, UpdateQuery } from "mongoose";

export interface IDataBaseServices {
  findByIdUpdate<T extends Document>(
    id: string,
    data: UpdateQuery<T>
  ): Promise<T | null>;
  findById<T extends Document>(id: string): Promise<T>;
  create<T extends Document>(data: T): Promise<T>;
  delete(id: string): Promise<Object>;
  findAll<T extends Document>(): Promise<T[]>;
}
