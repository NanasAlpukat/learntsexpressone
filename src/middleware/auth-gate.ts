import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { JwtToken } from "../config/Env";
import { JwtPaylod } from "../@types/interfaces";
import redisClient from "../utility/ConnectRedis";
// import redisClient from "../utility/ConnectRedis";

export const authGate = async (req:Request, res:Response, next: NextFunction) =>{
      const accessToken = req.cookies.accessToken
      if(!accessToken){
        return res.status(401).json({"message":"Unauthorization"})
      }

      const decode = jwt.verify(accessToken, JwtToken) as JwtPaylod
      const session = redisClient.get(decode.id ? decode.id.toString() : '')
      
      if(!session){
        return res.status(401).json({'messgae' : 'session not found, you need to login'})
      }

      req.user = decode

      next()
}