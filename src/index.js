import express from 'express';
import { connectDB } from './database.js';
import router from './routes/index.js';

const PORT = process.env.PORT || 3000;
const app = express();

await connectDB();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.info(`Server is listening on http://localhost:${PORT}`);
});
