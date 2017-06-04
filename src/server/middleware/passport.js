import passport from 'koa-passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import route from 'koa-route';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config';

export default (app) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.jwt.secret;

  // Authentication
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({ id: jwtPayload.id }, (err, user) => {
      if (err) {
        done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));

  // app.use(passport.session());
  app.use(route.post('/register', async (ctx, next) => {
    const data = ctx.request.body;
    const errors = [];

    // Validation
    if (!data.email || !data.password || !data.confirmed_password) {
      errors.push('Please fill in all the fields.');
    } else if (data.password !== data.confirmed_password) {
      errors.push('Password does not match the confirm password.');
    }

    if (errors.length) {
      ctx.response.body = {
        success: false,
        errors,
      };
    } else {
      const newUser = new User({
        email: data.email,
        password: data.password,
      });

      // User must be unique
      const existingUser = await User.findOne({ email: data.email });

      if (existingUser) {
        ctx.response.body = {
          success: false,
          errors: ['That email address already exists.'],
        };
      } else {
        // Attempt to save the new user.
        try {
          await newUser.save();
          ctx.response.body = {
            success: true,
            message: 'Successfully created new user.',
          };
        } catch (err) {
          next(err);
        }
      }
    }
  }));

  app.use(route.post('/logout', (ctx) => {
    console.log(this.session);
    this.session = null;
    ctx.response.body = { success: true };
  }));

  app.use(route.post('/authenticate',
    async (ctx) => {
      const user = await User.findOne({ email: ctx.request.body.email });

      if (!user) {
        ctx.response.body = { success: false, errors: ['Authentication failed.'] };
      } else {
        const isMatch = await user.comparePassword(ctx.request.body.password);

        if (isMatch) {
          const token = jwt.sign({ email: user.email, role: user.role }, config.jwt.secret, {
            expiresIn: 10080, // in seconds
          });

          ctx.response.body = { success: true, token: `JWT ${token}` };
        } else {
          ctx.response.body = { success: false, errors: ['Password did not match'] };
        }
      }
    },
  ));
  app.use(route.get('/dashboard', passport.authenticate('jwt'), (ctx) => {
    console.log(ctx);
  }));
};
