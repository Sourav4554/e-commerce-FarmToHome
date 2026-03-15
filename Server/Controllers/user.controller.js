import {
  currentUserService,
  updateProfileService,
  deleteProfileService,
} from "../Services/user.service.js";

//find user controller
const currentUserController = async (req, res, next) => {
  try {
    const currentUser = await currentUserService(req.user);
    return res.status(200).json({
      message: "user returned",
      data: currentUser,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

//update user profile
const updateProfileController = async (req, res, next) => {
  try {
    const updatedProfile = await updateProfileService(req.body, req.user);
    return res.status(201).json({
      message: "profile updated",
      data: updatedProfile,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

//controller for delete profile
const deleteProfileController = async (req, res, next) => {
  try {
    const deleted = await deleteProfileService(req.user);
    if (deleted) {
      res.status(201).json({
        message: "accout deleted",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};
export {
  currentUserController,
  updateProfileController,
  deleteProfileController,
};
