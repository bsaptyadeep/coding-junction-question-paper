const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionPaperSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    exam: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('QuestionPaper', questionPaperSchema);