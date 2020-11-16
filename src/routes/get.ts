import { Router } from 'express';
import { get } from '../controllers/Get';
const getRouter: Router = Router();
getRouter.get('/:id', get);
export default getRouter;
