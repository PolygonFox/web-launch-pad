import cors from 'kcors';
import session from 'koa-session';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cookie from 'koa-cookie';
import { server as config } from 'settings';

export default (app) => {
  app.use(bodyParser());
  app.use(json());
  app.use(cookie());
  app.use(logger());
  app.use(cors({
    origin: '*',
  }));
  app.use(session(app));
};
