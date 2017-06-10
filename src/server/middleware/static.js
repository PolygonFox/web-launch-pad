import fs from 'fs';
import path from 'path';
import serve from 'koa-static';

const readFileThunk = src => new Promise((resolve, reject) => {
  fs.readFile(src, { encoding: 'utf-8' }, (err, data) => {
    if (err) return reject(err);
    return resolve(data);
  });
});

export default (app) => {
  app.use(serve('dist/web'));

  // Return the client
  app.use(async (ctx, next) => {
    const src = path.resolve('dist/web/index.html');

    await next();
    console.log(ctx.response);
    if (ctx.response.status !== 200) {
      ctx.response.type = 'text/html';
      ctx.response.body = await readFileThunk(src);
    }
  });
};
