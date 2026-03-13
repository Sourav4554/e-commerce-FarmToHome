
import { userRegisterService } from "../Services/userRegistration.service.js";

const userRegistration = async (req, res, next) => {
  try {
    const newUser = await userRegisterService(req.body);
    if (newUser) {
      return res
        .status(200)
        .json({
          message: "user Registered please Login!",
          success: true,
          data: newUser,
        });
    }
  } catch (error) {
    next(error);
  }
};

export { userRegistration };
