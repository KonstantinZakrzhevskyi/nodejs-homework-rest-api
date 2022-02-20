const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
// == 2 ===
// require(dotenv).config();

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// // == multer example ==
// // const express = require("express");
// // const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs/promises");
// const { v4 } = require("uuid");

// app.use(express.static("public"));

// // const app = express();

// // app.use(cors());

// const tempDir = path.join(__dirname, "temp");

// // настройки multer, для того чтобы он сохранял файл с правильным именем
// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

// // упрощенные настройки
// // const upload = multer({ dest: "temp/" });
// const contacts = [];

// const avatarDir = path.join(__dirname, "public", "avatars");

// app.post("/api/contacts", upload.single("image"), async (req, res, next) => {
//   // console.log(req.body);
//   // console.log(req.file);
//   const { path: tempUpload, filename } = req.file;
//   try {
//     const resultUpload = path.join(avatarDir, filename);
//     await fs.rename(tempUpload, resultUpload);
//     const image = path.join("avatars", filename);
//     const newContact = { ...req.body, id: v4(), image };
//     contacts.push(newContact);
//     res.status(201).json(newContact);
//   } catch (error) {
//     await fs.unlink(tempUpload);
//   }
// });

// // app.listen(3000);

// // =============

// // по лекции из записи
// // app.use("/api/files", filesRouter);
// // ========

// === sendGrid ===
// const sgMail = require("@sendgrid/mail");
// // require("dotenv").config();

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const mail = {
//   to: "xavoj61384@diolang.com",
//   from: "konstantinz2505@gmail.com",
//   subject: "Новое письмо с сайта",
//   html: "<p>Новое письмо с сайта</p>",
// };

// sgMail
//   .send(mail)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

// =========

module.exports = app;

// SendGrid KEY (hw06-email): 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
// SendGrid KEY (hw06): SG.Asw8sD1QS-yYBG9u45yiiw.NxDb_YOuRyHQ5MkUBal1G1z3CaXdRY8qQ3pPZLZAP-s
