const modelProvider = require("../Models/modelProvider")
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
const createProvider =(async(req,res)=>{
    req.body.image=req.file?.filename
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(req.body.password, salt)
const Provider=new modelProvider({
    ...req.body,
    password:hashpassword,
    codeVerification:code
})
await Provider.save(req.body,(error,item)=>{
    if (error){
        res.status(400).json({
            message:"Faile to create provider",
            data:error
        })
    }
    else{
            const info =  transport.sendMail({
              from: '"Maddison Foo Koch " <e_commerce@gmail.com.email>', // sender address
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
                </html>`, // html body
            });
        res.status(200).json({
            message:"Success",
            data:item
        })
    }
})
})
const listProvider =(async(req,res)=>{
    try {
        const Provider=await modelProvider.find()
        res.status(200).json({
            message: "Success",
            data:Provider
        })
    } catch (error) {
        res.status(400).json({
            message:"Failed to get list",
            data:error
        })
        
    }
})
const deleteProvider=(async(req,res)=>{
    try {
        const Provider=await modelProvider.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({
            message:"Success",
            data:Provider
        });
    } catch (error) {
        res.status(400).json({
            message:"Failed",
            data:error
        });
        
    }
});
module.exports={createProvider,listProvider,deleteProvider}