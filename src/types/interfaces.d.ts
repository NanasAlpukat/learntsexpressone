

export interface IUser {
  id?:string | null
  name : string | null
  email : string | null
  password : string | null
}

export interface JwtPaylod extends Omit<IUser, 'password'>{}