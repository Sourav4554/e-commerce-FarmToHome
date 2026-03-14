import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    role: {
      type: String,
      default: "customer",
      enum: ["customer", "vendor", "admin"],
    },
    district: {
      type: String,
    },
    panchayath: {
      type: String,
    },
    ward: {
      type: String,
    },
    avatar: {
      type: String,
    },
    provider: {
      type: String,
      default: "local",
      enum: ["local", "google"],
    },
    providedid: {
      type: String,
    },
    profilecomplete: {
      type: Boolean,
    },
    isapproved: {
      type: Boolean,
      default:function(){
      return this.role==='vendor'?false:true
      }
    },
  },
  { timestamps: true }
);

const usermodel = mongoose.model.user || mongoose.model("user", userSchema);

export default usermodel;
