import mongoose, { Connection } from "mongoose"

class DatabaseConnection {
    private static context: DatabaseConnection
    public connection: Connection

    public connectDatabase = (username: string, password: string, cluster: string, database: string) => {
        const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`
        const options = {
        }

        mongoose.connect(uri, options).then(() => {
            this.connection = mongoose.connection
        })
    }

    public static getInstance(): DatabaseConnection {
        if (!this.context) {
            this.context = new DatabaseConnection()
        }

        return this.context
    }
}

export default DatabaseConnection
