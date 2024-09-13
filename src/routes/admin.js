import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';

const router = Router();

router.get(
  '/',
  auth.restrictedAccess,
  admin.adminAccess,
  admin.queryRole,
  UserController.readAll
);

router.get(
  '/:id',
  auth.restrictedAccess,
  admin.adminAccess,
  UserController.read
);

router.post(
  '/',
  auth.restrictedAccess,
  admin.adminAccess,
  admin.promoteUser,
  UserController.create
);

export default router;
