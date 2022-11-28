const QuestionPaper = require("../models/questionPaperModel");

const questionPaperUpload = async (req, res, next) => {
    try {
        console.log(req.file)
        console.log(req.body.data)
        const data = JSON.parse(req.body.data)
        const paper = new QuestionPaper({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
            subjectCode: data.subjectCode,
            subjectName: data.subjectName,
            year: data.year,
            exam: data.exam,
            semester: data.semester,
            branch: data.branch
        })
        await paper.save();
        res.status(201).send('File Uploaded Successfully');
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}

const getallQuestionPapers = async (req, res, next) => {
    try{
        const files = await QuestionPaper.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}


const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}


module.exports = {
    questionPaperUpload,
    getallQuestionPapers
}