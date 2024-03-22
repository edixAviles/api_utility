import DatabaseConnection from "./database_connection"
import TransactionSession from "./transaction_session"

class TransactionManager {
  private dbContext: DatabaseConnection

  constructor() {
    this.dbContext = DatabaseConnection.getInstance()
  }

  public async beginTransaction(): Promise<TransactionSession> {
    const session = await this.dbContext.connection.startSession()
    session.startTransaction({
      readConcern: { level: "snapshot" },
      writeConcern: { w: "majority" }
    })

    const transaction = new TransactionSession(session)
    return transaction
  }
}

export default TransactionManager
