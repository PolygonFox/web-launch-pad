import passport from 'koa-passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import route from 'koa-route';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import mongoose from 'mongoose';
import { server as config } from 'settings';

export default (app, publicRouter) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.jwt.secret;

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({ _id: mongoose.Types.ObjectId(jwtPayload.id) }, (err, user) => {
      if (err) {
        done(err, false);
      }
      if (user) {
        console.log('Authenticated user.');
        done(null, true);
      } else {
        done(null, false);
      }
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  publicRouter.post('/register', async (ctx, next) => {
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
  });

  publicRouter.post('/logout', (ctx) => {
    ctx.session = null;
    ctx.response.body = { success: true };
  });

  publicRouter.post('/authenticate',
    async (ctx) => {
      const user = await User.findOne({ email: ctx.request.body.email });

      if (!user) {
        ctx.response.body = { success: false, errors: ['Authentication failed.'] };
      } else {
        const isMatch = await user.comparePassword(ctx.request.body.password);

        if (isMatch) {
          const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role,
          }, config.jwt.secret, {
            expiresIn: '1h', // in seconds
          });

          ctx.response.body = { success: true, token: `JWT ${token}` };
        } else {
          ctx.response.body = { success: false, errors: ['Password did not match'] };
        }
      }
    },
  );

  // Authentication
  app.use(passport.initialize());
  app.use(passport.session());
};
