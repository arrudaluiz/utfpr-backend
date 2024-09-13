import { hashSync } from 'bcrypt';
import { User } from '../src/models/User.js';
import { connectDB, disconnectDB } from '../src/database.js';

const rawPassword = process.env.INITIAL_ADMIN_PASSWORD || 'admin';
const admin = {
  name: process.env.INITIAL_ADMIN_NAME || 'Luiz',
  surname: process.env.INITIAL_ADMIN_SURNAME || 'Arruda',
  username: process.env.INITIAL_ADMIN_USERNAME || 'admin',
  password: hashSync(rawPassword, 10),
  role: 'admin'
};

async function createAdmin() {
  try {
    connectDB();

    const query = User.where({ role: 'admin' });
    const existingAdmin = await query.findOne();

    if (existingAdmin) {
      process.exit(0);
    }

    const newAdmin = await User.create(admin);
    console.info(`Admin user created successfully: ${newAdmin.username} `);
    process.exit(0);
  } catch (error) {
    console.error('Error checking admin user:', error);
    process.exit(1);
  }
}

await createAdmin();
