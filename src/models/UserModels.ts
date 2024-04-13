import { Prisma, PrismaClient } from "@prisma/client";
import { IUserModel } from "./IModels";
import { IUser } from "../@types/interfaces";



class UserModels implements IUserModel{
  protected prisma = new PrismaClient()

  getAll = async(): Promise<Object> => {
    const user = await this.prisma.users.findMany()
    return user
  }
  create = async(name: string, email: string, password: string): Promise<IUser> => {
    const user = await this.prisma.users.create({
      data:{
          name : name,
          email : email,
          password:password
      }
  })

  return user
  }

  update = async(id: string, email?: string, name? : string, password?: string): Promise<IUser> => {
    const user =  await this.prisma.users.update({
      where:{ id:id},
      data:{
          name:name,
          email:email,
          password:password
      }
    })
    return user
  }

  delete = async(id: string): Promise<IUser | any> =>  {
    try{
      const user = await this.prisma.users.delete({
        where:{
            id : id
        }})
  
      return user
    }catch(e : any){
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if(e.code === "P2025"){
          return 'P2025'
        }
      }

      throw e
    }
  }

  show = async(param : string , data : string): Promise<IUser | any > => {

      if(param === 'id'){
        const user = await this.prisma.users.findFirst(
          {
            where:{id:data}
          }
        )        
        return user
      }else if(param === 'email'){
        const user = await this.prisma.users.findFirst(
          {
            where:{email:data}
          }
        )        
        return user
      }else if(param === 'name'){
        const user = await this.prisma.users.findFirst(
          {
            where:{name:data}
          }
        )        
        return user
      }else{
        return 'param tidak diketahui'
      }
  }


}


export default new UserModels()














// #  Take's Error Prisma

// import { PrismaClient, Prisma } from '@prisma/client'
// const client = new PrismaClient()

// try {
//   await client.user.create({
//     data: {
//       email: 'alreadyexisting@mail.com'
//     }
//   })
// } catch (e) {
//   if (e instanceof Prisma.PrismaClientKnownRequestError) {
//     // Properti .code dapat diakses dengan aman berdasarkan tipe data
//     if (e.code === 'P2002') {
//       console.log('Terjadi pelanggaran batasan unik, pengguna baru tidak dapat dibuat dengan email ini')
//     }
//   }
//   throw e
// }


