import mongoose from "mongoose";

// Interface to describe properties needed for new user
interface UserAttrs {
  email: string;
  password: string;
}

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

const User = mongoose.model('User', userSchema);

// Implement type checking for TS and Mongoose compatibility!
const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User, buildUser };
