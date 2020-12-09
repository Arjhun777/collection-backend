import { Router } from 'express';
import { validateUserDetails, UserDetails } from 'Models/userDetails';
import auth from 'Src/middlewares/auth';
import { errorResponse } from 'Src/utils/helper';

const router = Router();

router.post('/createUser', async (req, res) => {
    const { error } = validateUserDetails(req.body);
    if (error) return errorResponse(error, res);
    const { firstName, lastName, phoneNumber, address, ssn } = req.body;
    const userDetails = new UserDetails({ firstName, lastName, phoneNumber, address, ssn });
    userDetails.save().then((data) => {
        res.status(201).send({ message: 'Successfully Registered' });
    }).catch(err => {
        res.status(400).send(err);
    })
});

router.get('/getDetails', auth, async (req, res) => {
    const { pageNo } = req.params;
    UserDetails.find().limit(10).skip(pageNo * 10).then((userDetails) => {
        res.status(200).send(userDetails);
    });
});

export default router;