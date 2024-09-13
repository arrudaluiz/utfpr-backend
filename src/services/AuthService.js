import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

class AuthService {
  async verifyUser(username) {
    return await User.findOne({ username }).lean();
  }

  verifyPassword(rawPassword, hashedPassword) {
    return compareSync(rawPassword, hashedPassword);
  }

  createToken(user) {
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return token;
  }

  verifyToken(bearerToken, callback) {
    const token = bearerToken.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, callback);
  }
}

export default new AuthService();
