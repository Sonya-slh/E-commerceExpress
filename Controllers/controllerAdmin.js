const modelAdmin = require("../Models/modelAdmin");
const nodemailer = require("nodemailer");
const { randomBytes } = require("crypto")
const code = randomBytes(6).toString("hex")
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "edc52ba97adbcb",
    pass: "d9219c2cd01b38",
  },
});

const bcrypt = require("bcrypt");
const createAdmin = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req.body.password, salt);
  const Admin = new modelAdmin({
    ...req.body,
    password: hashpassword,
    codeVerification:code
  });
  await Admin.save(req.body, (error, item) => {
    if (error) {
      res.status(400).json({
        message: "Faile to create admin",
        data: error
      });
    } else {
        transport.sendMail({
        from: '"Maddison Foo Koch 👻" <e_commerce@gmail.com.email>',
        to: item.email,
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <h1>verify account</h1>
                    <a href="http://localhost:3000/User/verify/${item.codeVerification}">click here </a>
                </body>
                </html>`, // html body
      });

      res.status(200).json({
        message: "Success",
        data: item,
      });
    }
  });
};
const listAdmin = async (req, res) => {
  try {
    const Admin = await modelAdmin.find();
    res.status(200).json({
      message: "Success",
      data: Admin,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to get list",
      data: error,
    });
  }
};
const deleteAdmin = async (req, res) => {
  try {
    const Admin = await modelAdmin.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "Success",
      data: Admin,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed",
      data: error,
    });
  }
};
module.exports = { createAdmin, listAdmin, deleteAdmin };
