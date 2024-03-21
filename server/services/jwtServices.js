const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class JwtServices {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  async comparePassword(password, ownerPassword) {
    try {
      return await bcrypt.compare(password, ownerPassword);
    } catch (error) {
      throw new Error("Could not compare passwords");
    }
  }
  signToken(payload) {
    try {
      return jwt.sign(payload, this.secret, { expiresIn: "1h" });
    } catch (error) {
      throw new Error("Could not sign token");
    }
  }
}

const jwtServices = new JwtServices();

module.exports = jwtServices;
