import { ObjectId } from "mongodb"
import BaseModel from "./base-model"

import { TransactionSession } from "../database"
import { Utilities } from "../shared"

export default abstract class Repository<T extends BaseModel> {
  readonly transaction?: TransactionSession

  constructor(transaction?: TransactionSession) {
    this.transaction = transaction
  }

  static readonly filterToGetById = (id: ObjectId): object => {
    return {
      _id: id,
      isDeleted: { $ne: true },
    }
  }

  static readonly filterToGetActive = (): object => {
    return {
      isDeleted: { $ne: true },
    }
  }

  readonly optionsToInsert = (): object => {
    if (!this.transaction?.session) {
      return {}
    }

    return {
      session: this.transaction.session,
    }
  }

  readonly optionsToUpdate = (): object => {
    const options = new Map<string, any>()
    options.set("new", true)

    if (!this.transaction?.session) {
      return options
    }

    options.set("session", this.transaction.session)
    return Utilities.mapToObject(options)
  }

  static readonly paramsToDelete = (): object => {
    return {
      isDeleted: true,
      deletedAt: new Date(),
    }
  }

  readonly mapObjectToUpdate = (entity: T): object => {
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
