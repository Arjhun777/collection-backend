import { Router } from 'express';
import { LoginDetails, validateLogin } from 'Models/login';
import { errorResponse } from 'Src/utils/helper';

const router = Router();

router.post('/', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return errorResponse(error, res);
    const { email, password } = req.body;
    const token = process.env.TOKEN;
    LoginDetails.findOne({ email }, (err, login) => {
        if (login === null || err) { 
            return res.status(400).send({ 
                message : "User not found."
            }); 
        } 
        else { 
            if (login.checkPassword(password)) { 
                return res.status(200).send({ 
                    message : "User Logged In",
                    token
                }) 
            } 
            else { 
                return res.status(400).send({ 
                    message : "Invalid Credential"
                }); 
            } 
        }
    });
});

export default router;