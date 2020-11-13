import { Router } from 'express';
import { page } from '../controllers/Upload';
const uploadRouter: Router = Router();

uploadRouter.get('/', page);

export default uploadRouter;
