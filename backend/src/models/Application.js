const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    companyName: {
        type: String,
        required: true,
        maxLength: 25,
    },
    role: {
        type: String,
        required: true,
        maxLength: 25,
    },
    platform: {
        type: String,
        required: true,
        enum: ['LinkedIn', 'Indeed', 'Glassdoor', 'AngelList', 'Other'],
    }, status: {
        type: String,
        required: true,
        enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'],
        default: 'Applied',
    },
    jobLink: {
        type: String,
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume"
    },
    applicationDate: {
        type: Date,
        default: Date.now()
    },
    notes: {
        type: String,
        maxLength: 200
    }

}, { timestamps: true })

const Application = mongoose.model("Application", applicationSchema)

module.exports = Application;