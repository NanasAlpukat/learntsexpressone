import { Application} from "express";
export const Server = ( app : Application, Port: string | undefined):void =>{
  const port: string = Port ?? "3000";
  app.listen(port,() =>{
    console.log(`Server is running on Port : ${port}`)
  })
}