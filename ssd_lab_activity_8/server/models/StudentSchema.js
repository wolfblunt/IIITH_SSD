const mongoose = require('mongoose')

let Schema = mongoose.Schema
const StudentSchema = new Schema(
    {
        exam_name: {
            type: String,
            required: true
        },
        course_name: {
            type: String,
            required: true
        },
        question_num: {
            type: Number,
            required: true
        },
        ta_roll: {
            type: String,
            required: true,
        },
        roll: {
            type: String,
            required: true
        },
        ta_comment: {
            type: String,
        },
        std_comment: {
            type: String,
        },
        IsActive: {
            type: Boolean
        }
    },
    { timestamps: true }
)

const Student = mongoose.model('queries', StudentSchema)

module.exports = Student


// exam_name: String
// ▪ course_name: String
// ▪ question_num: Number
// ▪ ta_roll: String
// ▪ std_roll: String
// ▪ ta_comment: String
// ▪ std_comment: String
// ▪ IsActive: Boolean
