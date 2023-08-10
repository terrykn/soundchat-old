const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const app = express();

const { GridFsStorage } = require("multer-gridfs-storage");
const { GridFSBucket } = require('mongodb');

const crypto = require("crypto");

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("CONNECTED TO MONGODB");

    /* MIDDLEWARE */
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("common"));
    app.use(cors());

    const storage = new GridFsStorage({
      url: process.env.MONGODB_URL,
      options: { useNewUrlParser: true, useUnifiedTopology: true },
      
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if(err) return reject(err);
            const filename = buf.toString("hex") + path.extname(file.originalname);
            const fileInfo = {
              filename: filename,
              bucketName: "uploads", 
            };
            resolve(fileInfo);
          });
        });
      },
    });

    const upload = multer({ storage });

    
    app.post("/api/upload", upload.single("file"), (req, res) => {
        try {
          return res.status(200).json({ filename: req.file.filename });
        } 
        catch(err) {
          console.error(err);
        }
    });
    
    app.get("/api/image/:filename", (req, res) => {
      const filename = req.params.filename;
      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });

      const downloadStream = bucket.openDownloadStreamByName(filename);
      res.setHeader("Content-Type", "image/png");
      downloadStream.pipe(res);
    })
    

    app.use("/api/auth", authRoute);
    app.use("/api/users", usersRoute);
    app.use("/api/posts", postRoute);

    app.listen(8800, () => {
        console.log("BACKEND SERVER IS RUNNING");
    });
    } catch(error) {
        console.error("ERROR CONNECTING TO MONGODB:", error.message);
    }
})();