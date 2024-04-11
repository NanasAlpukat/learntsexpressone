import express,{ Application} from "express";
import {Port} from './config/Env'
import cors from "cors"
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { Server } from "./config/Server";
import routers from "./routers";


class App {
    public app : Application
   
    constructor (){

        this.app = express()
        this.plugins()
    }

    protected plugins():void{
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(cookieParser())
        // this.app.use(cookieParser() as express.RequestHandler)
        this.app.use(helmet())
        this.app.use(routers)
    }

    // protected routers(): void {
    //   this.app.route("/").get((req:Request,res:Response)=>{
    //     return res.json({'message':"hallo dunia"})
    //   })
    // }

}


const app = new App().app
Server(app,Port)
