import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    // The higher second number is, the higher encyption is.
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Alexander Borisov",
    email: "alex@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Sergei Fedotenkov",
    email: "sergei@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
