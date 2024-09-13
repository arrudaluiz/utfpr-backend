import { User } from '../models/User.js';
import { HttpError } from '../helpers/HttpError.js';

const userMiddleware = {
  queryRole: (req, res, next) => {
    req.query.role = 'user';
    next();
  },
  limitedAccess: async (req, res, next) => {
    const foundUser = await User.findById(req.params.id).lean();

    if (!foundUser) {
      const newError = new Error('The requested user does not exist.');
      newError.statusCode = 404;

      const error = new HttpError(newError);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }

    if (
      !foundUser._id.equals(req.user._id) &&
      (req.user.role !== 'admin' || foundUser.role === 'admin')
    ) {
      const newError = new Error();
      newError.statusCode = 403;

      const error = new HttpError(newError);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }

    next();
  }
};

export default userMiddleware;
