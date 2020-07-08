import mongoose from "mongoose";

import { Password } from '../general/password';

// Interface to describe properties needed for new user
interface UserAttrs {
  email: string;
  password: string;
};

// Interface describing properties of User Model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
};

// Interface describing User document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      ret.id = ret._id;
      delete ret._id;
    },
    versionKey: false,
  }
});

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));

    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };
