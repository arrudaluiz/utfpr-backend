import { Service } from './Service.js';
import { Vehicle } from '../models/Vehicle.js';

class VehicleService extends Service {
  constructor(model) {
    super(model);
  }
}

export default new VehicleService(Vehicle);
