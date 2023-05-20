import express from 'express';
import { userGetBackOtp, verifyOtp } from '../middleware/auth';
import {
  register,
  login,
  verifyRegister,
  resendOtp,
} from '../controllers/authController';
import {
  userLoginValidation,
  userRegisterValidation,
} from '../middleware/validation';

const router = express.Router();

// @router POST api/user/register
// @desc Register user
// @access Public

router.post('/register', userRegisterValidation, register);

router.post('/register/resend-OTP', userGetBackOtp, resendOtp);

router.post('/register/otp', verifyOtp, verifyRegister);

router.post('/login', userLoginValidation, login);


export default router;
