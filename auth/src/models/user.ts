import mongoose from "mongoose";

// Interface to describe properties needed for new user
interface UserAttrs {
  email: string;
  password: string;
};

// Interface desctibing properties of User Model
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
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };
