
interface IUserModel {
  getAll(): Promise<Object>
  create(name: string, email: string, password:string): Promise<Object>
  update(id:string, email? : string, name? : string, password?: string): Promise<Object>
  delete(id:string): Promise<any>
  show(param : string, data : string): Promise<any>
}


export {IUserModel}