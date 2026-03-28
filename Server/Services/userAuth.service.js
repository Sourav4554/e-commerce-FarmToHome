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
    throw new AppError("user Already Exist Please Login !", 409);
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
  const user = await usermodel
    .findOne({ email })
   // .select("password email role provider blockByAdmin name");
  if (!user) {
    throw new AppError("user doesnt exist please register", 401);
  }

  if (user.blockByAdmin && user.role === "customer") {
    throw new AppError("cant login your account is blocked by admin", 401);
  }
  if (user.provider === "google") {
    throw new AppError("Please Login with google", 401);
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new AppError(" password is wrong", 401);
  }
  const token = generateToken(user);
  return {token,user};
};

//service for passport google authentication
export const googleAuthentication = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    let user = await usermodel.findOne({ providedid: profile.id });
    if (user) {
      return done(null, user);
    }
    user = await usermodel.findOne({ email: profile.emails[0].value });
    if (user) {
      user.providedid = profile.id;
      user.provider = google;
      await user.save();
      return done(null, user);
    }
    const newUser = await usermodel.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      providedid: profile.id,
      provider: "google",
      profilecomplete: false,
    });
    return done(null, newUser);
  } catch (error) {
    done(error);
  }
};

//service for profile completion after google authentication
export const completeProfileService = async (body, olduser) => {
  const { phone, whatsapp, role, district, panchayth, ward } = body;
  if (!phone || !whatsapp || !role || !district || !panchayth || !ward) {
    throw new AppError("Fill all fields", 400);
  }
  const user = await usermodel.findById(olduser._id);
  if (!user) {
    throw new AppError("user doesnt exist please register", 401);
  }
  user.phone = phone;
  user.whatsapp = whatsapp;
  user.role = role;
  user.district = district;
  user.panchayth = panchayth;
  user.ward = ward;
  user.profilecomplete = true;
  user.isapproved = role === "customer" ? true : false;
  const newUser = await user.save();
  return newUser.toObject();
};
