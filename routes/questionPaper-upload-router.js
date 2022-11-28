const express = require('express');
const {upload} = require('../helpers/questionPaperHelper');
const { questionPaperUpload, getallQuestionPapers } = require('../controllers/questionPaperUploaderController');
const router = express.Router();


router.post('/question-paper', upload.single('file'), questionPaperUpload);
router.get('/question-paper', getallQuestionPapers);

// router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
// router.get('/getSingleFiles', getallSingleFiles);
// router.get('/getMultipleFiles', getallMultipleFiles);


module.exports = {
    routes: router
}