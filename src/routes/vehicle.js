import { Router } from 'express';
import VehicleController from '../controllers/VehicleController.js';
import admin from '../middlewares/admin.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get(
  '/',
  auth.restrictedAccess,
  VehicleController.readAll
);

router.get(
  '/:id',
  auth.restrictedAccess,
  VehicleController.read
);

router.post('/',
  auth.restrictedAccess,
  admin.adminAccess,
  VehicleController.create
);

router.put(
  '/:id',
  auth.restrictedAccess,
  admin.adminAccess,
  VehicleController.update
);

router.delete(
  '/:id',
  auth.restrictedAccess,
  admin.adminAccess,
  VehicleController.delete
);

export default router;
