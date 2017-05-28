import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import connection from '../database';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Client', 'Admin', 'Super Admin'],
    default: 'Client',
  },
});

// Save the user's hashed password.
UserSchema.pre('save', function preSave(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (saltError, salt) => {
      console.log(`Salt: ${salt}`);
      if (saltError) {
        next(saltError);
      }

      bcrypt.hash(user.password, salt, (hashError, hash) => {
        console.log(`Hash: ${hash}`);
        if (hashError) {
          next(hashError);
        }
        user.password = hash;
        next();
      });
    });
  }
});

// Create method to compare password
UserSchema.methods.comparePassword = function* comparePassword(password) {
  const isMatch = yield bcrypt.compare(password, this.password);
  console.log('Kaas2' + isMatch);
  return isMatch;
};

export default connection.model('User', UserSchema);
