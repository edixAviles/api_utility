import { ObjectId } from "mongodb"

const baseSchema = {
    _id: {
        type: ObjectId,
        required: true,
        auto: true,
    },
    creatorUser: {
        type: String,
    },
    updaterUser: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
    },
    deletedAt: {
        type: Date,
    },
    deleterUser: {
        type: String,
    }
}

export default baseSchema