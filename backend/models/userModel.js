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

// Custom function that can be used on a User document
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Mongo Middleware
// pre save: encrypt the user provided password before save it to database
userSchema.pre("save", async function (next) {
  // IMPORTANT! We need to check if the password field has been updated
  // i.e. if a user only updates his/her email or username
  // we don't want to re-hash the user's password
  if (!this.isModified("password")) {
    // Just move on  - don't do anything to the password
    next();
  }

  // If a user actually updated the password
  // or created the password for the first time (when register)
  // we then need to hash/rehash the password
  const salt = await bcrypt.genSalt(10);

  // Initially this.password would be plain text that user provided
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
