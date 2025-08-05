const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const accessRoute = require('./routes/accessRoute')
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const cors = require('cors');
const path = require("path");
require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/access",accessRoute);
app.use("/api/categories", categoryRoute);

app.get('/', (req, res)=> {
  res.get(`<h1> This is the backend of the blogify web app</h1>`);
})
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend is running on port ${PORT}`);
});

