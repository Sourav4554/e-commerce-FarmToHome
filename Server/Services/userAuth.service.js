import usermodel from "../Models/usermodel.js";
import AppError from "../Utilities/AppError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Utilities/jsonToken.js";

//user registration service
export const userRegisterService = async (body) => {
  const {
    name,
    email,
    password,
    phone,
    whatsapp,
    role,
    district,
    panchayth,
    ward,
  } = body;

  const user = await usermodel.findOne({ email });
  if (user) {
    throw new AppError("user Already Exist", 409);
  }
  const hashedPassword = await bcrypt.hash(password, 6);
  const newUser = await usermodel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    whatsapp,
    role,
    district,
    panchayth,
    ward,
    profilecomplete: true,
  });
  const userInfo = newUser.toObject();
  delete userInfo.password;
  return userInfo;
};

//user Login Service
export const userLoginService = async (email, password) => {
  const user = await usermodel.findOne({ email });
  if (!user) {
    throw new AppError("user doesnt exist pleas register", 401);
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new AppError("The password is wrong", 401);
  }
  const token = generateToken(user);
  return token;
};
