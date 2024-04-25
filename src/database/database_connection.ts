import mongoose, { Connection } from "mongoose"

export default class DatabaseConnection {
  private static instance: DatabaseConnection
  connection: Connection

  private constructor() {}

  connectDatabase(
    username: string,
    password: string,
    cluster: string,
    database: string,
  ) {
    const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`
    const options = {}

    mongoose.connect(uri, options).then(() => {
      this.connection = mongoose.connection
      console.info("Mongo is running")
    })
  }

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }

    return DatabaseConnection.instance
  }
}
