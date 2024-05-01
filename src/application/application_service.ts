import { TransactionManager } from "../database"

export default abstract class ApplicationService {
  readonly transactionManager: TransactionManager

  constructor() {
    this.transactionManager = new TransactionManager()
  }
}
