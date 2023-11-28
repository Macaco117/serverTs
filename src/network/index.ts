import { Application } from 'express';
import UserNetwork from '../network/users';
import Routes from '../utils/cosntants/routes.json'

function routes(app: Application){
    app.use(Routes.userV1, UserNetwork);
}

export default routes;