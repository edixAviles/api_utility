import { TransactionManager } from "../database/transaction_manager"

export abstract class ApplicationService {
    public transactionManager: TransactionManager

    constructor() {
        this.transactionManager = new TransactionManager()
    }
}
