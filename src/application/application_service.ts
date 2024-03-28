import TransactionManager from "../database/transaction_manager"

export default abstract class ApplicationService {
  public transactionManager: TransactionManager

  constructor() {
    this.transactionManager = new TransactionManager()
  }
}
