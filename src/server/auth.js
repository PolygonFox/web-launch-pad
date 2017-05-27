import passport from 'koa-passport';

import { Strategy as LocalStrategy } from 'passport-local';

const fetchUser = (() => {
  const user = { id: 1, username: 'test', password: 'test' };
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

passport.use(new LocalStrategy((username, password, done) => {
  fetchUser().then((user) => {
    if (username === user.username && password === user.password) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));
