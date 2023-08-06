const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const app = express();

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

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/images");
      },
      filename: (req, file, cb) => {
        cb(null, req.body.name);
      },
    });

    const upload = multer({ storage: storage });
    app.post("/api/upload", upload.single("file"), (req, res) => {
        try {
            return res.status(200).json("FILE UPLOADED");
        } catch(err) {
            console.error(err);
        }
    });

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