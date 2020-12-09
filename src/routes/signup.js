import { Router } from 'express';
import { LoginDetails, validateLogin } from 'Models/login';
import { errorResponse } from 'Src/utils/helper';

const router = Router();

router.post('/', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return errorResponse(error, res);
    const { email, password } = req.body;
    LoginDetails.exists({ email }).then((status) => {
        if (!status) {
            const loginDetails = new LoginDetails({ email });
            loginDetails.password = loginDetails.generateHash(password);
            loginDetails.save().then((value) => {
                res.status(201).send({ message: 'Registred Successfully' })
            }).catch(err => {
                res.status(400).send(err);
            });
        } else {
            res.status(400).send({ message: 'User Already Exist' })
        }
    });
});

export default router;