const AuthorsModel = require('../models/Authors')
const VerificationsModel = require('../models/Verifications')
const EmailModel = require('../models/Email')

const addAuthor = (req, res)=>{
    // post request from register form
    // res.json(req.body)
    // 1- save this new author in authors collection
    AuthorsModel.create({
        name: req.body.fullName,
        email: req.body.email,
        address: {
            country: req.body.country,
            city: req.body.city
        },
        phone: req.body.phone,
        verified: false
    }).then(insertedAuthor=>{
        // insert done
        // generate a random string 
        let secretKey = Math.random().toString(36).slice(-8);
        // create a new record/document in Verifications collection
        VerificationsModel.create({
            userId:insertedAuthor._id,
            secretKey: secretKey
        }).then(insertedVerification=>{
            // insert Verification Done
            // Send an email to author to confirm
            EmailModel.send(req.body.email, "Confirm Account", `
            Hello,<br> The Email "${req.body.email}" is used to register in Our Book Store. To verify Your account please click on <a href="${req.get('origin')}/verify?userId=${insertedAuthor._id}&secretKey=${secretKey}">This Link</a>
 Thanks
 BookStore Team.
            `).then(info=>{
                // Sending Done
                res.send(`<script>alert('Check Your Email To confirm')</script>`)
            }).catch(error=>{
                // Error on sending Email
                res.render('mainTemplate', {title: 'Error on sending Email', error: error, content: "404"})
            })
        }).catch(error=>{
            // error on Insert Verification
            res.render('mainTemplate', {title: 'Error on Verification', error: error, content: "404"})
        })

    }).catch(error=>{
        // error inserting Author
        res.render('mainTemplate', {title: 'Error on Insert Author', error: error, content: "404"})
    })
}

// getting register page/content
const getRegisterPage = (req, res)=>{
    res.render('mainTemplate', {title: "Register", content: 'register'})
}

const veifyEmail = (req, res)=>{
    // find userId & secretKey FROM Verification ==> update user.veify = true if exist
    VerificationsModel.findOne({userId: req.query.userId, secretKey: req.query.secretKey}).then(Verification=>{
        // update author.verify = true
        AuthorsModel.findOneAndUpdate({_id: Verification.userId}, {
            $set: {
                verified: true
            }
        }).then(result=>{
            // update done
            // delete the record/document in Verification
            VerificationsModel.findOneAndDelete({userId: req.query.userId}).then(result=>{
                // delete done , SUCCESS
                res.redirect('/admin')
            }).catch(error=>{
                // Error On Delete record/document from Verfications
                res.render('mainTemplate', {title: 'Error on Insert Author', error: error, content: "404"})
            })
        }).catch(error=>{
            // Error on update author.verify
            res.render('mainTemplate', {title: 'Error on Insert Author', error: error, content: "404"})
        })
    }).catch(error=>{
        // error Not found on Verifications
        res.render('mainTemplate', {title: 'Error on Insert Author', error: error, content: "404"})
    })
}

module.exports = {
    getRegisterPage,
    addAuthor,
    veifyEmail
}