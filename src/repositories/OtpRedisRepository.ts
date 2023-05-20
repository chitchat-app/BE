import redisUtils from '../utils/redisUtils';
interface OtpInfoRedis {
  otp: string;
  email: string;
}

const PREFIX_KEY = 'OTP:';
const EXPIRE = 100;

export const set = (payload: OtpInfoRedis) => {
  const key = PREFIX_KEY + payload.email;
  const value = payload.otp;
  return redisUtils.set(key, value, EXPIRE);
};

export const get = (email: String) => {
  return redisUtils.get(PREFIX_KEY + email);
};

export default {
  set,
  get,
};
