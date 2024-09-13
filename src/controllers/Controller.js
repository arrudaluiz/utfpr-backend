import autoBind from 'auto-bind';
import { HttpError } from '../helpers/HttpError.js';

export class Controller {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async readAll(req, res) {
    try {
      const response = await this.service.readAll(req.query);
      return res.status(response.statusCode).json(response);
    } catch (err) {
      const error = new HttpError(err);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }
  }

  async read(req, res) {
    try {
      const response = await this.service.read(req.params.id);
      return res.status(response.statusCode).json(response);
    } catch (err) {
      const error = new HttpError(err);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }
  }

  async create(req, res) {
    try {
      const response = await this.service.create(req.body);
      return res.status(response.statusCode).json(response);
    } catch (err) {
      const error = new HttpError(err);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }
  }

  async update(req, res) {
    try {
      const response = await this.service.update(req.params.id, req.body);
      return res.status(response.statusCode).json(response);
    } catch (err) {
      const error = new HttpError(err);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }
  }

  async delete(req, res) {
    try {
      const response = await this.service.delete(req.params.id);
      return res.status(response.statusCode).json(response);
    } catch (err) {
      const error = new HttpError(err);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }
  }
}
