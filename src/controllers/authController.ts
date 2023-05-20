import { Request, Response } from "express";
import argon2 from "argon2";
import User from "../models/User";
import UserInfoRedis from "../repositories/userRedisRepository";
import OtpRedis from "../repositories/OtpRedisRepository";
import { generateOTP } from "../utils/OTPUtils";
import { generateToken } from "../utils/tokenUtils";
import { mailRegister } from "../utils/mailUtils";
import { response } from "../utils/responseUtils";

const register = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await argon2.hash(password);
    const otp = generateOTP();
    const userInfo = {
      username,
      email,
      password: hashedPassword,
    };
    const dataOtp = {
      otp: otp,
      email: email,
    };
    UserInfoRedis.set(userInfo);
    OtpRedis.set(dataOtp);
    mailRegister(otp, email);

    response(
      res,
      200,
      true,
      "We was send you an OPT, Please check it in your email."
    );
  } catch (err) {
    console.log(err);
    return response(res, 500, false, "Internal server error");
  }
};

const verifyRegister = async (req, res) => {
  const { email } = req.body;
  const reply = await UserInfoRedis.get(email);
  const user = JSON.parse(reply);
  try {
    const newUser = new User(user);
    newUser.save();
    // const newUserInfo = new UserInfo({
    //   userId: newUser._id,
    //   username: user.username,
    //   phone: user.phone,
    //   userType: user.userType,
    // });
    // newUserInfo.save();

    response(res, 200, true, "user successfully registered");
  } catch (error) {
    console.log(error);
    return response(res, 500, false, "Internal server error");
  }
};

const resendOtp = async (req, res) => {
  const otp = generateOTP();
  const { email } = req.body;
  const dataOtp = {
    otp: otp,
    email: email,
  };

  try {
    OtpRedis.set(dataOtp);
    mailRegister(otp, email);
    response(
      res,
      200,
      true,
      "We was resend you an OPT, Please check it in your email again."
    );
  } catch (error) {
    console.log(error);
    return response(res, 500, false, "Internal server error");
  }
};
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response(res, 404, false, "Incorrect email or password?");
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return response(res, 400, false, "Incorrect email or password?");
    }
    const token = generateToken(user._id);
    // updateRefreshToken(user._id, token.refreshToken);
    response(res, 200, true, "Login successful", { token, userId: user._id });
  } catch (err) {
    console.log(err);
    return response(res, 500, false, "Internal server error");
  }
};

export { register, login, verifyRegister, resendOtp };
