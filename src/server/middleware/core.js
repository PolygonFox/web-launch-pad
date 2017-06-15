import cors from 'kcors';
import session from 'koa-session';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cookie from 'koa-cookie';
import ssl from 'koa-force-ssl';

import { server as config } from 'settings';

export default (app) => {
  app.use(bodyParser());
  app.use(json());
  app.use(cookie());
  app.use(logger());
  app.use(cors({
    origin: '*',
  }));
  if (config.SSL.enabled) {
    app.use(ssl(config.SSL.port));
  }
  app.use(session(app));
};
