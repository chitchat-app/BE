import client from "../config/redis";

const set = (
  key: string,
  value: string,
  exTime: number,
) => {
  return client.set(key, value, { EX: exTime });
};

const get = (key: string) => {
  return client.get(key);
};

export default {
  get,
  set,
};
