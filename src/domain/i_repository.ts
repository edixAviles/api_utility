import { ObjectId } from "mongodb"
import BaseModel from "./base_model"

export interface IRepository<T extends BaseModel> {
  getAsync(id: ObjectId): Promise<T | null>
  insertAsync(entity: T): Promise<T>
  updateAsync(entity: T): Promise<T>
  deleteAsync(id: ObjectId): Promise<void>
}
