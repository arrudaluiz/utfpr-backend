import { Service } from './Service.js';
import { User } from '../models/User.js';

class UserService extends Service {
  constructor(model) {
    super(model);
  }

  validateDeletion(role) {
    if (role === 'admin') {
      const error = new Error('Delete admin users is not allowed.');
      error.statusCode = 400;
      throw error;
    }
  }
}

export default new UserService(User);
