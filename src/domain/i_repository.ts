import { ObjectId } from "mongodb"
import BaseModel from "./base_model"

interface IRepository<T extends BaseModel> {
    get(id: ObjectId): Promise<T | null>
    insert(entity: T): Promise<T>
    update(entity: T): Promise<T>
    delete(id: ObjectId): Promise<void>
}

export default IRepository
