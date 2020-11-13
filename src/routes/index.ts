import { Router } from 'express';
import uploadRouter from './upload';
const routes = Router();
routes.use('/', uploadRouter);

export default routes;
