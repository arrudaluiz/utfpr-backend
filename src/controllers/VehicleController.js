import autoBind from 'auto-bind';
import { Controller } from './Controller.js';
import VehicleService from '../services/VehicleService.js';

class VehicleController extends Controller {
  constructor(service) {
    super(service);
    autoBind(this);
  }

  // TODO: Verify if vehicle is NOT in use to allow DELETE operation
}

export default new VehicleController(VehicleService);
