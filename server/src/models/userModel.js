const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");

const userSchema = new mongoose.Schema(
  {
    // user gets random password and needs to change it on first access
    firstAccess: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
      validate(value) {
        if (value !== "professor" && value !== "student") {
          throw new Error("Invalid role");
        }
      },
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        const regExp = /^[a-zA-Z]+$/;
        if (!regExp.test(value)) throw new Error("should contain only letters");
      },
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      validate(value) {
        const regExp = /^[a-zA-Z]+/;
        if (!regExp.test(value)) throw new Error("should contain only letters");
      },
    },
    birthday: {
      type: Date,
      required: false,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        //const regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.()])[A-Za-z\d!@#$%^&.*()]{8,}$/;
        if (!regex.test(value)) {
          throw new Error(
            "must contain at least 8 characters and include lower and uppercase letters and numbers"
          );
        }
      },
    },

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    token: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

//middlewares
///?TODO: generate random password and send email

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//middlewares_end
userSchema.statics.findUserByEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("user does not exist", "UserNotFound", 404);
  }

  const isPassMatch = await bcrypt.compare(password, user.password);

  if (!isPassMatch) {
    throw new Error("unable to login");
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "12h",
    }
  );

  user.token = token;
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  //goes before signifying to obj, so returns the new obj to the client
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;

  return userObj;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
