import jwt from 'jsonwebtoken';

import { server as config } from 'settings';

export default {
  authenticate: function handleAuthentication(ctx) {
    // Username
    const user = {
      username: 'test',
      email: 'test@test.com',
    };

    const token = jwt.sign(user, config.jwt.secret, {
      expiresIn: 4000,
    });

    ctx.body = {
      success: true,
      token,
    };
  },
};
