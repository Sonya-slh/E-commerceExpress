const { error } = require("console");
const User = require("../Models/modelUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "edc52ba97adbcb",
    pass: "d9219c2cd01b38",
  },
});

let refreshtokens = [];
const { join } = require("path");
const modelUser = require("../Models/modelUser");

const generateAccesstoken = (user) => {
  return jwt.sign({ id: user.id }, process.env.accessKey, { expiresIn: "15m" });
};
const generateRefreshoken = (user) => {
  return jwt.sign({ id: user.id }, process.env.refreshkey, { expiresIn: "20m" });
};
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
        data: null,
      });
    } else {
      const accessToken = generateAccesstoken(user);
      const refreshToken = generateRefreshtoken(user);
      console.log("1", refreshtokens);
      refreshtokens.push(refreshtoken);
      console.log("2", refreshtokens);
      res.status(200).json({
        message: "Success",
        data: user,
        accesstoken: accesstoken,
        refreshtoken: refreshtoken,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
    });
  }
};
const verifyed = async (req, res) => {
  try {
    const email = await User.findOne({
      codeVerification: req.params.codeVerification,
    });
    console.log("result:", req.params.codeVerification);
    (email.codeVerification = undefined), (email.verify = true), email.save();
    return res.sendFile(join(__dirname + "../../templates/sucesss.html"));
  } catch (error) {
    return res.sendFile(join(__dirname + "../../templates/error.html"));
  }
};
const forgetPass = async (req, res) => {
  try {
    const email = req.body.email;
    const one = await User.findOne({ email });
    if (!one) {
      res.status(400).json({
        message: "user not found",
      });
    }
    const token = jwt.sign({ _id: one._id }, process.env.accessKey, { expiresIn: "2h" });
    await User.findOneAndUpdate({ email: email }, { resetpass: token });
    transport.sendMail(
      {
        from: "admin@gmail.com",
        to: one.email,
        subject: "Forgot Passsword" + one.name,
        text: "mail de confirmation",
        html: `<!DOCTYPE html>
            <html lang="en">
            
            <body>
                <h1>Forget Password</h1>
                <a href="http://localhost:3000/User/resetpassword/${token}">click here to reset your password</a>
            </body>
            </html>`,
      },
      (err, info) => {
        if (err) {
          console.log("error", err);
        } else {
          console.log("email sent:", info);
        }
      }
    );
    res.status(201).json({
      success: true,
      message: "check your email",
      data: one,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};
const resetpass = async (req, res) => {
  try {
    const token = jwt.verify(req.params.token, process.env.accessKey, async (error) => {
      if (error) {
        return res.status(400).json({
          message: "error",
        });
      }
      const findUser = await User.findOne({ resetpass: req.params.token });
      const salt = await bcrypt.genSalt(10);
      const newpass = await bcrypt.hash(req.body.password, salt);
      findUser.resetpass = undefined;
      findUser.password = newpass;
      findUser.save();
      res.status(200).json({ message: "password updated" });
    });
  } catch (error) {
   return res.status(400).json({
      message: "error",
    });
  }
};

const logoutUser = (req, res) => {
  try {
    const { refreshtoken } = req.body;

     const initialLength = refreshtokens.length;
    refreshtokens = refreshtokens.filter(token => token !== refreshtoken);
    const newLength = refreshtokens.length;

    if (initialLength === newLength) {
      return res.status(400).json({ message: "Token not found!" });
    }

    res.status(200).json({ message: "Success to logout!" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error: " + error.message });
  }
};
const profil =(async(req,res)=>{
  try {
    const ID= await User.findById({_id:req.params.id})
    
      res.status(200).json({
        message:"Success",
        data:ID
      })
     
  } catch (error) {
    res.status(400).json({
      message:"User not found",
      data:error
    })
  }
})

module.exports = { loginUser, verifyed, forgetPass, resetpass, logoutUser,profil};
