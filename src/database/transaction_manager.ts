import DatabaseConnection from "./database_connection"
import TransactionSession from "./transaction_session"

export default class TransactionManager {
  private dbContext: DatabaseConnection

  constructor() {
    this.dbContext = DatabaseConnection.getInstance()
  }

  async beginTransactionAsync(): Promise<TransactionSession> {
    const session = await this.dbContext.connection.startSession()
    session.startTransaction({
      readConcern: { level: "snapshot" },
      writeConcern: { w: "majority" },
    })

    const transaction = new TransactionSession(session)
    return transaction
  }
}
