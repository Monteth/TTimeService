import mongoose, {Schema} from 'mongoose'
const timeRecordSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    timeElapsed: {
        type: Number,
        required: true
    },
    startDate: {
        type: Number,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
})
const TimeRecord = mongoose.model("TimeRecord", timeRecordSchema)
export default TimeRecord