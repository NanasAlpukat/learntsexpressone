import { Request, Response } from "express"
import UsersService from "../../services/UsersService"
import { TypeRequest, TypeResponse } from "../../utility/InterfaceC"
import { IUser } from "../../types/interfaces"



class UsersController{

    protected service: UsersService = new UsersService()

    index = async(req:TypeRequest<Record<string, never>,IUser>,res:TypeResponse<{data:Object}>) : Promise<Response> =>{
        const users = await this.service.getUsers()
        return res.status(200).json({
          'data': users
        })   
    }

    update = async(req:TypeRequest<Record<string, never>,IUser>,res:TypeResponse<{message:string}>) : Promise<Response> =>{
      try{
        const {id} = req.params
        const {name,email,password} = req.body
        if(!name || !email || !password || !id){
            return res.status(400).json({'message':"data tidak boleh kosong"})
        }
       
        await this.service.updateUser(id,name, email, password)
        return res.status(200).json({'message':'Updated Successfuly'})
        // return res.status(201).json({'message':hash})
      }catch(e:any){
        return res.status(500).json({"message":e.message})
      }
    }

    delete = async(req:TypeRequest<Record<string, never>,IUser>,res:TypeResponse<{message:string}>) : Promise<Response> =>{
        const {id} = req.params

        if(!id){
          return res.status(400).json({'message':"param tidak boleh kosong"})
        }

        const user = await this.service.deleteUser(id)
        if(user.err){
          return res.status(400).json({'message':user.message})
        }
        return res.status(200).json({'message':'data berhasil di hapus'})
        // return res.status(200).json({'data':user})

    }
    show = async(req:TypeRequest<Record<string, never>,IUser>,res:TypeResponse<{data?:IUser, message?:string}>) : Promise<Response> =>{
        const {id} = req.params

        if(!id){
          return res.status(400).json({'message':"param tidak boleh kosong"})
        }

        const user = await this.service.showUser(id)
        if(!user){
          return res.status(400).json({'message':'data tidak ada'})
        }
        // return res.status(200).json({'message':'data berhasil di hapus'})
        return res.status(200).json({'data':user})

    }
}


export default new UsersController()





















// show(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Response<any, Record<string, any>> {
    //     throw new Error("Method not implemented.")
    // }

// import { TypeRequest,TypeResponse } from "src/Utilities/util_controllers/TypeControllers";
// import { IUser } from "./interface";

// export const getUsers = (req:TypeRequest<Record<string, never>,IUser>, res: TypeResponse<{message:object,token: string}>) =>{
//     const user:Array<IUser> = [
//         {
//             name: 'nanas',
//             email: 'nanas@gmail.com'
//         },
//         {
//             name: 'nanas',
//             email: 'nanas@gmail.com'
//         }
//     ]

//     return res.json({
//         message:user,
//         token: 'hsdhuasgougdofusigfugswudasgyf8t8qtw8te987qtw98t8w'
//     })
// }
