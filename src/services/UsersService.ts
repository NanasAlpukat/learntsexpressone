import UserModels from "../models/UserModels"
import { IUser } from "../@types/interfaces"
import { PwdHash } from "../utility/PasswordHash"

class UsersService{

  getUsers = async () : Promise<Object> =>{
     return await UserModels.getAll()
  }

  createUser = async (name : string, email : string, password : string ): Promise<IUser> => {
    const hash = await PwdHash(password)
    return await UserModels.create(name, email, hash)
  }

  updateUser = async (id:string, name? : string, email? : string, password? : string ): Promise<IUser> => {
    if(password){
      const hash = await PwdHash(password)
      return await UserModels.update(id,email,name,hash)
    }

    return await UserModels.update(id,email,name)
  }

  deleteUser = async (id: string): Promise<IUser | any> => {
    // return await UserModels.delete(id)
    const user = await UserModels.delete(id)
    if(user === 'P2025'){
      return {'err':true,'message':'data tidak ditemukan'}
    }
    return user
}

showUser = async(id: string) : Promise<IUser> => { 
    return await UserModels.show('id',id)
}

}

export default UsersService