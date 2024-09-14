import autoBind from 'auto-bind';
import { Controller } from './Controller.js';
import TimetableService from '../services/TimetableService.js';
import { HttpError } from '../helpers/HttpError.js';

class TimetableController extends Controller {
  constructor(service) {
    super(service);
    autoBind(this);
  }

  async read(req, res) {
    try {
      const foundTimetable = await this.service.read(req.params.id, [
        'user',
        'vehicle'
      ]);
      return res.status(foundTimetable.statusCode).json(foundTimetable);
    } catch (err) {
      const error = new HttpError(err);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }
  }
}

export default new TimetableController(TimetableService);
