import { Router } from 'express';
import fs from 'fs';
import { dirname, resolve } from 'path';
import pluralize from 'pluralize';
import { fileURLToPath } from 'url';
import { HttpError } from '../helpers/HttpError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routesPath = fs.readdirSync(__dirname);
const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({ isTheCakeALie: true });
});

for (const module of routesPath) {
  if (module !== 'index.js') {
    const name = module.split('.')[0];
    const modulePath = resolve(__dirname, module);
    const moduleContent = await import(modulePath);

    if (module === 'auth.js') {
      router.use('/auth', moduleContent.default);
    } else {
      router.use(`/${pluralize.plural(name)}`, moduleContent.default);
    }
  }
}

router.use('*', (req, res, next) => {
  const error = new Error('Resource not found.');

  error.statusCode = 404;
  next(error);
});

router.use((err, req, res) => {
  const error = new HttpError(err);
  error.log(req);
  return res.status(error.statusCode).json({ error });
});

export default router;
