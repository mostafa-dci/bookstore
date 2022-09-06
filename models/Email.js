const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})


const send = (emailTo, subject, message)=>{
    return new Promise((resolve, reject)=>{
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emailTo,
            subject: subject,
            html: message
        }).then(info=>{
            resolve(info)
        }).catch(error=>{
            reject(error)
        })
        // transporter.sendMail({
        //     from: process.env.EMAIL_USER,
        //     to: emailTo,
        //     subject: subject,
        //     html: message}, (error, info)=>{
        //     if(error){
        //         reject(error)
        //     }else{
        //         resolve(info)
        //     }
        // })
    })
}

module.exports = {send}