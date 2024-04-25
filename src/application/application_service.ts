import TransactionManager from "../database/transaction_manager"

export default abstract class ApplicationService {
  readonly transactionManager: TransactionManager

  constructor() {
    this.transactionManager = new TransactionManager()
  }
}
