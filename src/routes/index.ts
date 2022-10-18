import { Router } from 'express';

import * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/', HomeController.home);

router.get('/contato', InfoController.contato);
router.get('/sobre', InfoController.sobre);

router.get('/nome', UserController.nome);
router.get('/idade', UserController.idadeForm);
router.post('/idade-resultado', UserController.idadeAction);

router.post('/new-user', UserController.add);

router.get('/usuario/:id/add', UserController.addAge);
router.get('/usuario/:id/sub', UserController.subAge);
router.get('/usuario/:id/trash', UserController.trash);

export default router;