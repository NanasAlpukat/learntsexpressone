import { PwdCompare } from "../utility/PasswordHash"
import jwt from 'jsonwebtoken'
import UserModels from "../models/UserModels"
import { JwtPaylod } from "../types/interfaces"
import { AccessTokenTime, JwtToken, RefreshTokenTime } from "../config/Env"


class AuthService{

  jwtSign = (paylod:JwtPaylod, expiresIn: string) : string => {
    const secret = JwtToken ?? ""
    const token = jwt.sign(paylod, secret, {
      expiresIn
    })

    return token
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

    const paylod = {
      id:     user.id,
      name:   user.name,
      email:  user.email
    }

    const data = {
      'accessToken' : this.jwtSign(paylod, `${AccessTokenTime}m`),
      'refreshToken' : this.jwtSign(paylod, `${RefreshTokenTime}m`)
    }
    return data

}

}

export default AuthService