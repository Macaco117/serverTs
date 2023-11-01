import express, {Request, Response}  from 'express';
import routes from '.';

const router = express.Router();

function getUserByEmail(req: Request, res: Response){
    const {email} = req.params;
    res.send(`User with email ${email}`)
}

router.get('/', getUserByEmail)

export default router;