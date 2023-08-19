import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String

  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: String

  },
  date: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  auth_type: {
    type: String,

  }
});

const User = mongoose.model("User", UserSchema);
export default User;


// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       min: 2,
//       max: 100,
//     },
//     email: {
//       type: String,
//       required: true,
//       max: 50,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       min: 5,
//     },
//     city: String,
//     state: String,
//     country: String,
//     occupation: String,
//     phoneNumber: String,
//     transactions: Array,
//     role: {
//       type: String,
//       enum: ["user", "admin", "superadmin"],
//       default: "admin",
//     },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", UserSchema);
// export default User;
