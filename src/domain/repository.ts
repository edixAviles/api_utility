import { ObjectId } from "mongodb"

import BaseModel from "./base.model"
import TransactionSession from "../database/transaction_session"

abstract class Repository<T extends BaseModel> {
    public transaction: TransactionSession

    constructor(transaction: TransactionSession) {
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
        const options = {
            new: true
        }

        if (!this.transaction?.session) {
            return options
        }

        options["session"] = this.transaction.session
        return options
    }

    static paramsToDelete(): object {
        return {
            isDeleted: true,
            deletedAt: new Date()
        }
    }

    public mapObjectToUpdate(entity: T): object {
        const data = {}

        const entries = Object.entries(entity)
        entries.map(([key, val]) => {
            if (val || val >= 0) {
                data[key] = val
            }
        })

        return data
    }
}

export default Repository
