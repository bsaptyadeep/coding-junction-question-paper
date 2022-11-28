'use strict';
require("dotenv").config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
// const fileRoutes = require('./routes/file-upload-routes');
const questionPaperRoutes = require('./routes/questionPaper-upload-router');



const port = process.env.PORT;
const app = express();
app.use(cors());

// import library and files
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
// let express to use this
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./database')();

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', questionPaperRoutes.routes);

app.listen(port, () => console.log(`server is listening on url http://localhost:${port}`));