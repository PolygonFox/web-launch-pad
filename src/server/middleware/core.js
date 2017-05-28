import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import json from 'koa-json';
import logger from 'koa-logger';

export default (app) => {
  app.use(bodyParser());
  app.use(json());
  app.use(logger());
  app.use(cors({
    origin: '*',
  }));
  app.use(session({}, app));
};
