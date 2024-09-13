import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import admin from '../middlewares/admin.js';
import auth from '../middlewares/auth.js';
import user from '../middlewares/user.js';

const router = Router();

router.get(
  '/',
  auth.restrictedAccess,
  admin.adminAccess,
  user.queryRole,
  UserController.readAll
);

router.get(
  '/:id',
  auth.restrictedAccess,
  user.limitedAccess,
  UserController.read
);

router.post('/',
  UserController.create
);

router.put(
  '/:id',
  auth.restrictedAccess,
  user.limitedAccess,
  UserController.update
);

router.delete(
  '/:id',
  auth.restrictedAccess,
  user.limitedAccess,
  UserController.delete
);

export default router;
