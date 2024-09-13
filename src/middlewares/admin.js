import { HttpError } from '../helpers/HttpError.js';

const adminMiddleware = {
  promoteUser: (req, res, next) => {
    req.body.role = 'admin';
    next();
  },
  queryRole: (req, res, next) => {
    req.query.role = 'admin';
    next();
  },
  adminAccess: (req, res, next) => {
    if (req.user.role !== 'admin') {
      const newError = new Error();
      newError.statusCode = 403;

      const error = new HttpError(newError);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }
    next();
  }
};

export default adminMiddleware;
