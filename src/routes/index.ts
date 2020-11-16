import { Router } from 'express';
import uploadRouter from './upload';
import getRouter from './get';
const routes = Router();
routes.use('/', uploadRouter);
routes.use('/image', getRouter);
export default routes;
