import autoBind from 'auto-bind';
import { HttpResponse } from '../helpers/HttpResponse.js';

export class Service {
  constructor(model) {
    this.model = model;
    autoBind(this);
  }

  async readAll({ sortBy = { createdAt: -1 }, page = 0, limit, ...query }) {
    const limitOptions = [5, 10, 30];
    const allowedLimit = limitOptions.includes(Number(limit))
      ? Number(limit)
      : limitOptions[0];

    try {
      const documents = await this.model
        .find(query)
        .sort(sortBy)
        .skip(page * allowedLimit)
        .limit(allowedLimit)
        .lean();
      const count = await this.model.countDocuments(query);

      return new HttpResponse(documents, { count, limit: allowedLimit, page });
    } catch (error) {
      throw error;
    }
  }

  async read(id) {
    try {
      const document = await this.model.findById(id).lean();

      if (!document) {
        const error = new Error(
          `The requested ${this.model.collection.modelName.toLowerCase()} does not exist.`
        );
        error.statusCode = 404;
        throw error;
      }

      return new HttpResponse(document);
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      const { _id } = await this.model.create(data);
      const leanDocument = await this.model.findById(_id).lean();

      if (!leanDocument) {
        throw new Error(
          `${this.model.collection.modelName} not created. Please try again later.`
        );
      }

      return new HttpResponse(leanDocument);
    } catch (error) {
      if (error.name === 'MongoServerError') {
        switch (error.code) {
          case 11000:
            error.statusCode = 400;
            error.message = `${this.model.collection.modelName} already exists.`;
            break;
          default:
        }
      }
      throw error;
    }
  }

  async update(id, data) {
    try {
      const document = await this.model
        .findByIdAndUpdate(id, data, { new: true })
        .lean();

      if (!document) {
        const error = new Error(
          `${this.model.collection.modelName} not updated.`
        );
        error.statusCode = 400;
        throw error;
      }

      return new HttpResponse(document);
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const document = await this.model.findByIdAndDelete(id).lean();

      if (!document) {
        const error = new Error(
          `${this.model.collection.modelName} not found.`
        );
        error.statusCode = 404;
        throw error;
      }

      return new HttpResponse(document, { deleted: true });
    } catch (error) {
      throw error;
    }
  }
}
