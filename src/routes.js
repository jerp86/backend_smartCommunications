import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import EmployeeController from './app/controllers/EmployeeController';
import InstitutionController from './app/controllers/InstitutionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);

routes.get('/providers', ProviderController.index);

routes.get('/employees', EmployeeController.index);
routes.get('/employees/:id', EmployeeController.show);
routes.post('/employees', EmployeeController.store);
routes.post('/employees', EmployeeController.update);

routes.get('/institutions', InstitutionController.index);
routes.get('/institutions/:id', InstitutionController.show);
routes.post('/institutions', InstitutionController.store);
routes.post('/institutions', InstitutionController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
