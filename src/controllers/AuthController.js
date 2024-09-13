import AuthService from '../services/AuthService.js';
import { HttpError } from '../helpers/HttpError.js';

class AuthController {
  async auth(req, res, next) {
    try {
      const { username, password } = req.body;
      const foundUser = await AuthService.verifyUser(username);

      if (!foundUser) {
        const error = new Error(`Invalid credentials`);
        error.statusCode = 401;
        throw error;
      }

      const isPasswordValid = AuthService.verifyPassword(
        password,
        foundUser.password
      );

      if (!isPasswordValid) {
        const error = new Error(`Invalid credentials`);
        error.statusCode = 401;
        throw error;
      }

      const token = AuthService.createToken(foundUser);

      return res.status(200).json({ token });
    } catch (err) {
      const error = new HttpError(err);
      error.log(req);
      return res.status(error.statusCode).json({ error });
    }
  }
}

export default new AuthController();
