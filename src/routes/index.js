import { Router } from 'express';
import loginRouter from 'Routes/login';
import signupRouter from 'Routes/signup';
import userDetailsRouter from 'Routes/userDetails';

const router = Router();
router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/userDetails', userDetailsRouter);

export default router;