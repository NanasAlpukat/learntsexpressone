import { Request, Response } from "express";
import UsersService from "../../services/UsersService";
import AuthService from "../../services/AuthService";
import { TypeRequest, TypeResponse } from "../../utility/InterfaceC";
import { IUser } from "../../@types/interfaces";
import { AccessTokenTime, RefreshTokenTime } from "../../config/Env";
import redisClient from "../../utility/ConnectRedis";

class AuthController {
  protected service: UsersService = new UsersService()
  protected authService: AuthService = new AuthService()

  index = (req:TypeRequest<Record<string, never>,IUser>,res:TypeResponse<{data:any}>) =>{
    if(req.user){
      console.log(req.user,'user login')
      return res.status(200).json({data:req.user})
    }
    return res.status(400).json({data:'unauthorization'})
  }

  createUser = async(req:TypeRequest<Record<string, never>,IUser>,res:TypeResponse<{message:string}>) : Promise<Response> =>{
    try{
      const {name,email,password} = req.body
      if(!name || !email || !password){
          return res.status(400).json({'message':"data tidak boleh kosong"})
      }
     
      await this.service.createUser(name, email, password)
      return res.status(201).json({'message':'user berhasil di tambah kan'})
      // return res.status(201).json({'message':hash})
    }catch(e:any){
      return res.status(500).json({"message":e.message})
    }
  }


  // Omit digunakan untuk mengecualikan suatu data pada interface atau types yang ada di typescript
  // Record<string atau type, never atau type> digunakan untuk mengosongkan suatu data params yang ada di typescript

  login = async(req:TypeRequest<Record<string, never>,Omit<IUser, 'name'>>,res:TypeResponse<{message:string}>): Promise<Response> =>{
    try{
      const {email, password} = req.body
      if(!email || !password){
          return res.status(400).json({'message':"data tidak boleh kosong"})
      }
     
      const auth = await this.authService.login(email,password)
      if(auth.err){
        return res.status(400).json({'message':auth.message})
      }
      
      return res.cookie('accessToken',auth.accessToken,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + AccessTokenTime * 60 * 1000),
        sameSite: "strict"
      }).cookie('refreshToken',auth.refreshToken,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + RefreshTokenTime * 60 * 1000),
        sameSite: "strict"
      }).status(200).json({'message':'login in successfully'})
    }catch(e:any){
      return res.status(500).json({"message":e.message})
    }
  }

  refreshToken = async(req:Request,res:Response): Promise<Response> =>{
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
      return res.status(401).json({'message':'refresh token is wrong'})
    }
    
    const refreshT = await this.authService.refToken(refreshToken)
    
    if(refreshT.err === "Invalid")
      {
      return res.status(401).json({'message':'refresh token is invalid'})
    }else if(refreshT.err === "Invalid-session")
      {
      return res.status(401).json({'message':'refresh token  session is invalid'})
    }

    return res.cookie("accessToken", refreshT, {
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + AccessTokenTime * 60 * 1000),
        sameSite: "strict"
    }).status(200).json({'messgae':"refresh has been generate successfuly"})



  }

  logout = async(req:Request,res: Response ) : Promise<Response> =>{
    const user = req.user
    await redisClient.del(user?.id?.toString() as string)
    return res
          .cookie('accessToken',"",{maxAge:-1})
          .cookie('refreshToken',"",{maxAge:-1})
          .status(200).json({'message':'logout successfuly'})
  }

}

export default new AuthController()