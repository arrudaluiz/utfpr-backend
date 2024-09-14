import { Service } from './Service.js';
import { Timetable } from '../models/Timetable.js';

class TimetableService extends Service {
  constructor(model) {
    super(model);
  }
}

export default new TimetableService(Timetable);
