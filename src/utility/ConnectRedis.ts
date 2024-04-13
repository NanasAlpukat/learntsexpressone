import { createClient } from "redis";
import { RedisUrl } from '../config/Env'

const redisClient = createClient({
    url: RedisUrl,
})

const connectRedis = async() =>{
  try{
    await redisClient.connect()
    console.log('Redis Client Connect')
  }catch(e){
    console.log(e)
    process.exit(1)
  }
};

connectRedis();

redisClient.on('error', (err) => console.log(err))

export default redisClient