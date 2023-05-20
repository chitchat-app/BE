import RedisUtils from "../utils/redisUtils";

const PREFIX_KEY = "UserInfo:";
const EXPIRE = 1800;

interface UserInfoRedis {
  username: string;
  password: string;
  email: string;
}

export const set = (user: UserInfoRedis) => {
  const key = PREFIX_KEY + user.email;
  const value = JSON.stringify(user);
  return RedisUtils.set(key, value, EXPIRE );
};

export const get = (email: String) => {
  return RedisUtils.get(PREFIX_KEY + email);
};

export default {
  set,
  get,
};
