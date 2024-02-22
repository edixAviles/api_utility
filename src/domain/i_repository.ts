import { ObjectId } from "mongodb"
import BaseModel from "./base.model"

interface IRepository<T extends BaseModel> {
    get(id: ObjectId): Promise<T>
    insert(entity: T): Promise<T>
    update(entity: T): Promise<T>
    delete(id: ObjectId): Promise<void>
}

export default IRepository