import jwt from "jsonwebtoken";
export const generateToken = (user) => {
  const payload = {
    userId: user._id,
    role: user.role,
  };
  const jwtSecret=process.env.JWTSECRET;
  const token = jwt.sign(payload,jwtSecret,{expiresIn:'24hr'});
  return token;
};
