import { ClientSession } from "mongoose"

export default class TransactionSession {
  session: ClientSession

  constructor(session: ClientSession) {
    this.session = session
  }

  async completeTransactionAsync(): Promise<void> {
    await this.session.commitTransaction()
    await this.session.endSession()
  }

  async cancellTransactionAsync(): Promise<void> {
    await this.session.abortTransaction()
    await this.session.endSession()
  }
}
