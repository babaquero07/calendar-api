import { User } from "./models/User.js";

export class AuthService {
  constructor(User) {
    this.User = User;
  }

  static async createUser(name, email, password) {
    try {
      const user = new User({ name, email, password });
      await user.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
}
