import { Router } from "express";
import irouter from "./irouter";
import UsersController from "../controllers/users/usersController";
import { authGate } from "../middleware/auth-gate";



class UserRoutes implements irouter{
    public router : Router
    
    constructor(){
        this.router = Router()
        this.routes()
    }

    public routes(): void{
        this.router.get('/',authGate, UsersController.index)
        this.router.delete('/delete/:id',authGate, UsersController.delete)
        this.router.put('/update/:id',authGate, UsersController.update)
        this.router.get('/show/:id',authGate, UsersController.show)
    }
    
}
export default new UserRoutes().router