import DatabaseConnection from "./database_connection"
import TransactionSession from "./transaction_session"

class TransactionManager {
    private context: DatabaseConnection

    constructor() {
        this.context = DatabaseConnection.getInstance()
    }

    public async beginTransaction(): Promise<TransactionSession> {
        const session = await this.context.connection.startSession()
        session.startTransaction({
            readConcern: { level: "snapshot" },
            writeConcern: { w: "majority" }
        })

        const transaction = new TransactionSession(session)
        return transaction
    }
}

export = TransactionManager
