import passport from 'koa-passport';

const authentication = passport.authenticate('jwt', { session: false });
export default authentication;
