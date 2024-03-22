import { ObjectId } from "mongodb"
import BaseModel from "./base_model"
import TransactionSession from "../database/transaction_session"
import Utilities from "../shared/utilities"

abstract class Repository<T extends BaseModel> {
  public transaction?: TransactionSession

  constructor(transaction?: TransactionSession) {
    this.transaction = transaction
  }

  static filterToGetById(id: ObjectId): object {
    return {
      _id: id,
      isDeleted: { $ne: true }
    }
  }

  static filterToGetActive(): object {
    return {
      isDeleted: { $ne: true }
    }
  }

  public optionsToInsert(): object {
    if (!this.transaction?.session) {
      return {}
    }

    return {
      session: this.transaction.session
    }
  }

  public optionsToUpdate(): object {
    const options = new Map<string, any>()
    options.set("new", true)

    if (!this.transaction?.session) {
      return options
    }

    options.set("session", this.transaction.session)
    return Utilities.mapToObject(options)
  }

  static paramsToDelete(): object {
    return {
      isDeleted: true,
      deletedAt: new Date()
    }
  }

  public mapObjectToUpdate(entity: T): object {
    const data = new Map<string, any>()

    const entries = Object.entries(entity)
    entries.map(([key, val]) => {
      if (val || val >= 0) {
        data.set(key, val)
      }
    })

    return Utilities.mapToObject(data)
  }
}

export default Repository
