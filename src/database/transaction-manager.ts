import DatabaseConnection from "./database-connection"
import TransactionSession from "./transaction-session"

export default class TransactionManager {
  private readonly dbContext: DatabaseConnection

  constructor() {
    this.dbContext = DatabaseConnection.getInstance()
  }

  readonly beginTransaction = async (): Promise<TransactionSession> => {
    const session = await this.dbContext.connection.startSession()
    session.startTransaction({
      readConcern: { level: "snapshot" },
      writeConcern: { w: "majority" },
    })

    const transaction = new TransactionSession(session)
    return transaction
  }
}
