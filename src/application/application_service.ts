import TransactionManager from "database/transaction_manager"

abstract class ApplicationService {
    public transactionManager: TransactionManager

    constructor() {
        this.transactionManager = new TransactionManager()
    }
}

export default ApplicationService
