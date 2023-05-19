import redis from 'redis';
const client = redis.createClient({
  socket: {
        host: 'localhost',
        port: 6379
    }
});

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.error('Redis client error:', err);
});

export default client;