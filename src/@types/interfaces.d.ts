

export interface IUser {
  id?:string 
  name : string | null
  email : string | null
  password : string | null
}

export interface JwtPaylod extends Omit<IUser, 'password'>{}