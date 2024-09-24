import { User } from "./models/User.js";
import bcryptjs from "bcryptjs";

export class AuthService {
  constructor(User, bcryptjs) {
    this.User = User;
    this.bcryptjs = bcryptjs;
  }

  static async findUserByEmail(email) {
    try {
      const user = await User.findOne({ email });

      return user;
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  static async createUser(name, email, password) {
    try {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });

      await user.save();
      delete user._doc.password;

      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
}
