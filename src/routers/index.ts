import { Router } from "express";
import users from './users'
import irouter from "./irouter";
import auth from "./auth";

class RouterAll implements irouter{
    public router :Router

    constructor(){
            this.router = Router()
            this.routes()    
        }
    
    public routes():void{   
        this.router.use('/api/v1/users', users)
        this.router.use('/api/v1/auth', auth)

    }    
    
}

export default new RouterAll().router