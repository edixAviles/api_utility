import { ClientSession } from "mongoose"

export default class TransactionSession {
  readonly session: ClientSession

  constructor(session: ClientSession) {
    this.session = session
  }

  readonly completeTransaction = async (): Promise<void> => {
    await this.session.commitTransaction()
    await this.session.endSession()
  }

  readonly cancellTransaction = async (): Promise<void> => {
    await this.session.abortTransaction()
    await this.session.endSession()
  }
}
