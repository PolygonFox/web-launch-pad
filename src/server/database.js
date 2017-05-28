
import mongoose from 'mongoose';
// import mongo from 'mongodb';
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/webLaunchPad');

export default mongoose.connection;
