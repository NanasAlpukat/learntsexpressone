import { PwdCompare } from "../utility/PasswordHash"
import jwt from 'jsonwebtoken'
import UserModels from "../models/UserModels"
import { JwtPaylod } from "../@types/interfaces"
import { AccessTokenTime, JwtToken, RedisTime, RefreshTokenTime } from "../config/Env"
import redisClient from "../utility/ConnectRedis"
// import redisClient from "../utility/ConnectRedis"


class AuthService{

  jwtSign = (paylod:JwtPaylod, expiresIn: string) : string => {
    const secret = JwtToken ?? ""
    const token = jwt.sign(paylod, secret, {
      expiresIn
    })

    return token
  }

  refToken = async(refToken : string): Promise<any> =>{
    const decode = jwt.verify(refToken,JwtToken) as JwtPaylod
    if(!decode){
      return {'err':'Invalid'}
    }
    const session = await redisClient.get(decode.id ? decode.id.toString() : '')
    if(!session){
      return {'err':'Invalid-session'}
    }

    const newAccessToken = jwt.sign(decode, JwtToken)

    return newAccessToken

  }

  login = async (email:string, password:string ) : Promise<any> => {
  // login = async (email:string, password:string ) : Promise<boolean | {err: boolean; message: string;}> => {

    const user = await UserModels.show('email',email)
    if(!user){
      return {'err':true,'message':'email not found'}
    }

    const compare : boolean = await PwdCompare(password,user.password)
    if(!compare){
      return {'err':true,'message':'Wrong Password'}
    }

    const paylod : JwtPaylod = {
      id:     user.id,
      name:   user.name,
      email:  user.email
    }

    // redis wajib ada key dan value
    redisClient.set(`${user.id}`, JSON.stringify(user),{
      EX: RedisTime * 60 // mengatur expire data redis
    })

    const data = {
      'accessToken' : this.jwtSign(paylod, `${AccessTokenTime}m`),
      'refreshToken' : this.jwtSign(paylod, `${RefreshTokenTime}m`)
    }
    return data

}

}

export default AuthService