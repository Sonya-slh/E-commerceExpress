const modelCostomer=require("../Models/modelCostomer")
const nodemailer = require("nodemailer");
const {randomBytes}=require("crypto")
const code=randomBytes(6).toString("hex")
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "edc52ba97adbcb",
      pass: "d9219c2cd01b38"
    }
  });
const bcrypt=require('bcrypt')
const createCostomer =(async(req,res)=>{
    req.body.image=req.file?.filename
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(req.body.password, salt)
const Costomer=new modelCostomer({
    ...req.body,
    password:hashpassword,
    codeVerification:code
})
await Costomer.save(req.body,(error,item)=>{
    if (error){
        res.status(400).json({
            message:"Faile to create costomer",
            data:error
        })
    }
    else{
        console.log("item.email",item.email)
     const mailOptions=   {
   /*           from:'"My App"<e_commerce@gmail.com.email>',
            to:item.email,
            subject:"Bienvenu",
            text:"Bienvenu",
            html:"<b>Bienvenu?</b>"  */
         from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: item.email, // list of receivers
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
                </html>`,
        }
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          });
        res.status(200).json({
            message:"Success",
            data:item
        })
    }
})
})
const listCostomer =(async(req,res)=>{
    try {
        const Costomer=await modelCostomer.find()
        res.status(200).json({
            message: "Success",
            data:Costomer
        })
    } catch (error) {
        res.status(400).json({
            message:"Failed to get list",
            data:error
        })
        
    }
})
const deleteCostomer=(async(req,res)=>{
    try {
        const Costomer=await modelCostomer.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({
            message:"Success",
            data:Costomer
        });
    } catch (error) {
        res.status(400).json({
            message:"Failed",
            data:error
        });
        
    }
});
module.exports={createCostomer,listCostomer,deleteCostomer}