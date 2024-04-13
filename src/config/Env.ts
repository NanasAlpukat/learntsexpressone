import dotenv from "dotenv"
import { AccessT, DB_Url, JwtT, Port, RedisT, RedisUrl, RefreshT } from "../@types/types";
dotenv.config();

const Port : Port = process.env.PORT
const Db_Url : DB_Url = process.env.DATABASE_URL
const JwtToken : JwtT = process.env.JWT_TOKEN_SECRET ?? ''
const RedisUrl : RedisUrl = process.env.REDIS_URL
const AccessTokenTime : AccessT = process.env.ACCESS_TOKEN_TIME  ? parseInt(process.env.ACCESS_TOKEN_TIME) : 30 
const RefreshTokenTime : RefreshT = process.env.REFRESH_TOKEN_TIME ? parseInt(process.env.REFRESH_TOKEN_TIME) : 60
const RedisTime : RedisT = process.env.REDIS_TIME_IN ? parseInt(process.env.REDIS_TIME_IN) : 1080



export {Port, Db_Url, AccessTokenTime, RefreshTokenTime, JwtToken, RedisUrl, RedisTime} 