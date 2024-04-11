import { Router } from "express";
import irouter from "./irouter";
import AuthController from "../controllers/auth/AuthController";


class AuthRoutes implements irouter{
    public router : Router
    
    constructor(){
        this.router = Router()
        this.routes()
    }

    public routes(): void{
        this.router.post('/login', AuthController.login)
        this.router.post('/registrasi', AuthController.createUser)
        // this.router.get('/login', AuthController.logout)
    }
    
}
export default new AuthRoutes().router