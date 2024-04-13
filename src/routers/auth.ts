import { Router } from "express";
import irouter from "./irouter";
import AuthController from "../controllers/auth/AuthController";
import { authGate } from "../middleware/auth-gate";


class AuthRoutes implements irouter{
    public router : Router
    
    constructor(){
        this.router = Router()
        this.routes()
    }

    public routes(): void{
        this.router.get('/', authGate,AuthController.index)
        this.router.get('/logout', authGate,AuthController.logout)
        this.router.post('/login', AuthController.login)
        this.router.post('/registrasi', AuthController.createUser)
        this.router.get('/refresh', AuthController.refreshToken)
    }
    
}
export default new AuthRoutes().router