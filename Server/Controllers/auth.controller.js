import {
  userRegisterService,
  userLoginService,
} from "../Services/userAuth.service.js";
import AppError from "../Utilities/AppError.js";

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
    const token = await userLoginService(email, password);
    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ message: "sucessfully Login", success: false });
  } catch (error) {
    next(error);
  }
};
export { userRegistration, userLogin };
