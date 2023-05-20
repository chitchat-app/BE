import { sendMail } from "../config/mailConfig"

export const mailRegister = (otp: string, email: string) => {
  const message = `This is your OTP ${otp}`;
  sendMail(email, `OTP Chit Chat`, message);
};

