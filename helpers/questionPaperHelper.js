'use strict';
require("dotenv").config();
const multer = require('multer');
const path = require("path");
const { connect } = require("../database");
const crypto = require("crypto");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;

// DB
const mongoURI = process.env.DB;

// connection
try {
    mongoose.connect(mongoURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
} catch (error) {
    console.log(error);
}
process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});

let bucket;
mongoose.connection.on("connected", () => {
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "newBucket"
    });
  //  console.log(bucket);
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        console.log(file)
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads"
                };
                console.log(fileInfo)
                resolve(fileInfo);
            });
        });
    }
});


const filefilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
        console.log("yupp")
    } else {
        //  console.log("file not pdf")
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter });

module.exports = { upload }