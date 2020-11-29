import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Method to compare enteredPassword with the encrypted password in our DB.
userSchema.methods.matchPassword = async function (enteredPassword) {
  // this.password because we call match password on that specific user.
  // Any other field can accesed too(this.name, etc.)
  return await bcrypt.compare(enteredPassword, this.password);
};

// Whenever a new user is being registered, encrypt its password before saving it to our DB.
userSchema.pre("save", async function (next) {
  // Modify password only when it is passed, otherwise next().
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  // Initially this.password is plain text, we are reseting to be the hashed password.
  // Second argument takes salt.
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
