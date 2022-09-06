// Createa Schema:
// {
//     "name": String required ,
//     "email": String, required, unique,
//     "address": {
//         "country": String, required,
//         "city": String, required
//     },
//     "phone": String NOT required, min 10
// }

const mongoose = require('mongoose')

const authorsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already Exist"],
        validate: [val=>{
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
                return true;
                }
                return false;
        }, "is Not a valid"]
    },
    address: {
        type: {
            country: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            }
        }
    }, 
    phone: {
        type: String,
        required: false
    }
},{collection: 'authors'})

const AuthorsModel = mongoose.model("Authors", authorsSchema)

module.exports = authorsSchema