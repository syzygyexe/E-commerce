import jwt from "jsonwebtoken";

// id is the user._id which we want to add as a payload to our token.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // Token expiration time(in our case 30 days for testing)
    expiresIn: "30d",
  });
};

export default generateToken;
