import { Router } from 'express';
import TimetableController from '../controllers/TimetableController.js';
import admin from '../middlewares/admin.js';
import auth from '../middlewares/auth.js';
import timetable from '../middlewares/timetable.js';

const router = Router();

router.get(
  '/',
  auth.restrictedAccess,
  TimetableController.readAll
);

router.get(
  '/:id',
  auth.restrictedAccess,
  TimetableController.read
);

router.post('/',
  auth.restrictedAccess,
  admin.adminAccess,
  timetable.verifyDate,
  TimetableController.create
);

router.put(
  '/:id',
  auth.restrictedAccess,
  admin.adminAccess,
  timetable.verifyDate,
  TimetableController.update
);

router.delete(
  '/:id',
  auth.restrictedAccess,
  admin.adminAccess,
  TimetableController.delete
);

export default router;
