import autoBind from 'auto-bind';
import { hashSync } from 'bcrypt';
import { Controller } from './Controller.js';
import UserService from '../services/UserService.js';
import { HttpError } from '../helpers/HttpError.js';

class UserController extends Controller {
  constructor(service) {
    super(service);
    autoBind(this);
  }

  async create(req, res, next) {
    const { password, ...data } = req.body;

    try {
      data.password = hashSync(password, 10);
      const response = await this.service.create(data);
      return res.status(response.statusCode).json(response);
    } catch (err) {
      const error = new HttpError(err);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }
  }

  async delete(req, res, next) {
    try {
      const foundUser = await this.service.read(req.params.id);

      await this.service.validateDeletion(foundUser.data.role);

      const response = await this.service.delete(req.params.id);
      return res.status(response.statusCode).json(response);
    } catch (err) {
      const error = new HttpError(err);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }
  }
}

export default new UserController(UserService);
