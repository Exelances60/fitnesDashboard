import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface JwtServicesInterface {
  comparePassword(password: string, ownerPassword: string): Promise<boolean>;
  signToken(payload: string | object | Buffer): string;
}

class JwtServices implements JwtServicesInterface {
  secret: string;
  constructor() {
    this.secret = process.env.JWT_SECRET as string;
  }

  async comparePassword(password: string, ownerPassword: string) {
    try {
      return await bcrypt.compare(password, ownerPassword);
    } catch (error) {
      throw new Error("Could not compare passwords");
    }
  }
  signToken(payload: string | object | Buffer) {
    try {
      return jwt.sign(payload, this.secret, { expiresIn: "1h" });
    } catch (error) {
      throw new Error("Could not sign token");
    }
  }
}

const jwtServices = new JwtServices();

export default jwtServices;
