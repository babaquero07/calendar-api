import { AuthService } from "../auth/auth.service.js";
import { Event } from "./models/Event.js";

export class EventsService {
  constructor() {
    this.Event = Event;
  }

  static async createEvent({ title, notes, start, end, user_id }) {
    try {
      const user = await AuthService.getUserById(user_id);

      const event = new Event({ title, notes, start, end, user });
      await event.save();

      delete event._doc.user;

      return event;
    } catch (error) {
      console.error(error);

      throw new Error("Error creating event");
    }
  }
}
