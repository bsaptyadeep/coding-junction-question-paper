'use strict';
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const crypto = require("crypto");
const path = require("path");
const bodyParser = require('body-parser');
// const fileRoutes = require('./routes/file-upload-routes');
const questionPaperRoutes = require('./routes/questionPaper-upload-router');
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;


// DB
const mongoURI = process.env.DB;

// connection
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = process.env.PORT;
const app = express();
app.use(cors());

let gfs;
conn.once("open", () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = buf.toString("hex") + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: "uploads"
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });

// app.get("/image/:filename", (req, res) => {
//     // console.log('id', req.params.id)
//     const file = gfs
//         .find({
//             filename: req.params.filename
//         })
//         .toArray((err, files) => {
//             if (!files || files.length === 0) {
//                 return res.status(404).json({
//                     err: "no files exist"
//                 });
//             }
//             gfs.openDownloadStreamByName(req.params.filename).pipe(res);
//         });
// });


// app.get("/", (req, res) => {
//     if (!gfs) {
//         console.log("some error occured, check connection to db");
//         res.send("some error occured, check connection to db");
//         process.exit(0);
//     }
//     gfs.find().toArray((err, files) => {
//         // check if files
//         if (!files || files.length === 0) {
//             return res.render("index", {
//                 files: false
//             });
//         } else {
//             const f = files
//                 .map(file => {
//                     if (
//                         file.contentType === "image/png" ||
//                         file.contentType ==="image/jpeg"
//                     ) {
//                         file.isImage = true;
//                     } else {
//                         file.isImage = false;
//                     }
//                     return file;
//                 })
//                 .sort((a, b) => {
//                     return (
//                         new Date(b["uploadDate"]).getTime() -
//                         new Date(a["uploadDate"]).getTime()
//                     );
//                 });

//             return res.render("index", {
//                 files: f
//             });
//         }
//     });
// });


// const upload = multer({
//     storage
// });

app.get("/api/question-paper/:filename", (req, res) => {
    // console.log('id', req.params.id)
    const file = gfs
      .find({
        filename: req.params.filename
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist"
          });
        }
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      });
  });
  


require('./database')();

// app.use(bodyParser.json());
// app.set("view engine", "ejs");


// app.get("/", (req, res) => {
//     res.render("index")
// })
// app.post("/upload", upload.single("file"), (req, res) => {
//     res.redirect("/");
// });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', questionPaperRoutes.routes);

app.listen(port, () => console.log(`server is listening on url http://localhost:${port}`));