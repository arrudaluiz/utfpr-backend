import AuthService from '../services/AuthService.js';
import { HttpError } from '../helpers/HttpError.js';

const authMiddleware = {
  restrictedAccess: (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
      const newError = new Error('Invalid token.');
      newError.statusCode = 401;

      const error = new HttpError(newError);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }

    AuthService.verifyToken(token, (err, decoded) => {
      if (err) {
        const newError = new Error();
        newError.statusCode = 401;

        const error = new HttpError(newError);
        error.log(req);
        return res.status(error.statusCode).json({ error });
      }

      req.user = decoded;
      next();
    });
  }
};

export default authMiddleware;
