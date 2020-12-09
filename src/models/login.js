import mongoose from 'mongoose';
import Joi from 'joi';
import crypto from 'crypto'

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

loginSchema.methods.generateHash = function(password) {
    const hash = crypto.pbkdf2Sync(password, '8', 1000, 64, 'sha512').toString(`hex`);
    return hash;
}
loginSchema.methods.checkPassword = function(password) {
    const hashedPassword = crypto.pbkdf2Sync(password, '8', 1000, 64, 'sha512').toString(`hex`); 
    return this.password === hashedPassword; 
};
const LoginDetails = mongoose.model('logindetails', loginSchema);

const validateLogin = (requestData) => {
    const schema = {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
    return Joi.validate(requestData, schema);
}

export {
    LoginDetails,
    validateLogin
}