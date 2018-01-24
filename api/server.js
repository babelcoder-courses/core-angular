import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import auth from './middlewares/auth';

function setupRoutes(app) {
  const APP_DIR = `./app`;
  const features = fs
    .readdirSync(APP_DIR)
    .filter(file => fs.statSync(`${APP_DIR}/${file}`).isDirectory());

  features.forEach(feature => {
    const router = express.Router();
    const routes = require(`${APP_DIR}/${feature}/routes.js`);

    routes.setup(router);
    app.use(`/api/${feature}`, router);
  });
}

export function setup() {
  const app = express();
  const PORT = config.port;
  app.use(auth);
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  setupRoutes(app);
  app.listen(PORT, () =>
    console.log('App listening on http://localhost:' + PORT)
  );
}
