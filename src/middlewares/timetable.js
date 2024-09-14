import { HttpError } from '../helpers/HttpError.js';

const timetableMiddleware = {
  verifyDate: (req, res, next) => {
    if (req.body.startTime > req.body.endTime) {
      const newError = new Error();
      newError.statusCode = 400;

      const error = new HttpError(newError);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }
    next();
  }
};

export default timetableMiddleware;
