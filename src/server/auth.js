import passport from 'koa-passport';
import config from './config';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const fetchUser = (() => {
  const user = { id: 1, email: 'test@test.com', password: 'test' };
  return async function returnUser() {
    return user;
  };
})();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await fetchUser();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new JwtStrategy({
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
}, (payload, done) => {
  fetchUser().then((user) => {
    if (email === user.email && password === user.password) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));
