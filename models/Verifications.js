const mongoose = require('mongoose')


const verificationsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    secretKey: {
        type: String,
        unique: true,
        required: true
    }
}, {collection: 'verifications'})

const VerificationModel = mongoose.model('Verifications', verificationsSchema);

module.exports = VerificationModel;
