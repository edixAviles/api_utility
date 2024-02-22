
import mongoose from "mongoose"

import baseSchema from "./base_schema"

const baseOptions = {
    timestamps: true
}

const mongooseModel = (className: string, properties: any): mongoose.Model<any> => {
    const schema = new mongoose.Schema({
        ...baseSchema,
        ...properties,
    }, baseOptions)

    const model = mongoose.model(className, schema)
    return model
}

export default mongooseModel
