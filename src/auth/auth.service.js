import { User } from "./models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(User, bcryptjs, jwt) {
    this.User = User;
    this.bcryptjs = bcryptjs;
    this.jwt = jwt;
  }

  static async getUserById(id) {
    try {
      const user = await User.findById(id);

      return user;
    } catch (error) {
      console.error(error);

      throw new Error(`Error finding user by id: ${error.message}`);
    }
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

  static isPasswordValid(password, userPassword) {
    return bcryptjs.compare(password, userPassword);
  }

  static async generateJWT(uid, name) {
    const token = await new Promise((resolve, reject) => {
      const payload = { uid, name };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token);
        }
      );
    });

    return token;
  }

  static async login() {
    try {
    } catch (error) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }
}
