const express = require('express');
const {upload} = require('../helpers/questionPaperHelper');
const { questionPaperUpload, getallQuestionPapers } = require('../controllers/questionPaperUploaderController');
const router = express.Router();


router.post('/question-paper', upload.single('file'), questionPaperUpload);
router.get('/question-paper', getallQuestionPapers);

module.exports = {
    routes: router
}