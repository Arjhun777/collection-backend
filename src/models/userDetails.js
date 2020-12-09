import mongoose from 'mongoose';
import Joi from 'joi';
import { decryptText, encryptText } from 'Src/utils/helper';

const UserDetailsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    }, 
    phoneNumber: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    }, 
    ssn: {
        type: String,
        required: true,
        set: v => encryptText(v),
        get: v => decryptText(v),
    },

}, { toJSON: { getters: true }, timestamps: true });

const UserDetails = mongoose.model('userdetails', UserDetailsSchema);

const validateUserDetails = (requestData) => {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
        ssn: Joi.string().required(),
    }
    return Joi.validate(requestData, schema);
}

export {
    UserDetails,
    validateUserDetails
}