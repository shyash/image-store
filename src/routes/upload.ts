import { Router } from 'express';
import { page, uploadFile } from '../controllers/Upload';
const uploadRouter: Router = Router();
uploadRouter.get('/', page);
uploadRouter.post('/', uploadFile);
export default uploadRouter;
