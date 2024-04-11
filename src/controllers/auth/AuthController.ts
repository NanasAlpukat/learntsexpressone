import { Response } from "express";
import UsersService from "../../services/UsersService";
import AuthService from "../../services/AuthService";
import { TypeRequest, TypeResponse } from "../../utility/InterfaceC";
import { IUser } from "../../types/interfaces";
import { AccessTokenTime, RefreshTokenTime } from "../../config/Env";

class AuthController {
  protected service: UsersService = new UsersService()
  protected authService: AuthService = new AuthService()

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

}

export default new AuthController()