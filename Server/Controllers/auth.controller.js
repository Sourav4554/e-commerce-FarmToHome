import {
  userRegisterService,
  userLoginService,
  completeProfileService,
} from "../Services/userAuth.service.js";
import AppError from "../Utilities/AppError.js";
import { generateToken } from "../Utilities/jsonToken.js";

//cookie option
const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  priority: "high",
  path: "/",
};

//user registration controller
const userRegistration = async (req, res, next) => {
  try {
    const newUser = await userRegisterService(req.body);
    if (newUser) {
      return res.status(200).json({
        message: "user Registered please Login!",
        success: true,
        data: newUser,
      });
    }
  } catch (error) {
    console.log(error)
    next(error);
  }
};

//user login controller
const userLogin = async (req, res, next) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please fill both field", 400));
  }
  try {
    const {token,details} = await userLoginService(email, password);
    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ message: "sucessfully Login",userdata:details, success: true });
  } catch (error) {
    next(error);
    console.log(error)
  }
};

//google authentication controller
const googleAuthController = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError("Something wrong", 400));
  }
  try {
    const token = generateToken(user);
    //console.log(token)
    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ message: "sucessfully Login complete the form", success: true });
  } catch (error) {
    next(error);
  }
};

//complete profile after authentication
const completeProfileController = async (req, res, next) => {
  try {
   const updatedUser = await completeProfileService(req.body,req.user);
    if(updatedUser.role==='vendor'){
      const token = generateToken(updatedUser);
    //console.log(token)
    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });
    }
    return res.status(200).json({message:'welcome to dashboard',success:true})
  } catch (error) {
    next(error);
  }
};

//logout controller
const logoutController=(_,res)=>{
res.clearCookie('token',cookieOptions)
return res.status(200).json({
message:'sucessfully logout',
success:true
})
}
export {
  userRegistration,
  userLogin,
  googleAuthController,
  completeProfileController,
  logoutController
};
