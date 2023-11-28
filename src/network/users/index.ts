import express, {Request, Response}  from 'express';
import Controller from "../../controllers/users"
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

function getUserByEmail(req: Request, res: Response){
    const {email} = req.query;
    Controller.getUserByEmail(email.toString())
    .then((result) => res.send(result))
    .catch((err)=> res.send(err));
}

function createUser(req: Request, res: Response){
    const { names, lastNames, email, password } = req.body;
    Controller.createUser({ names, lastNames, email, password})
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
}

function login(req: Request, res: Response){
    passport.authenticate('local', async (error, user) =>{
        if(error){
            res.status(401).send(error);
        }
        if(!user && !error){
            res.status(401).send("User not found");
        }
        if(user && !error){
            const token = jwt.sign(user, process.env.Secret_Key as string);
            res.status(200).send({token});
        }
    })(req,res);
}

router.get('/', getUserByEmail);
router.post('/', createUser);
router.post('/login', login);

export default router;