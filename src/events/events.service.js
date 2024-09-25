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

  static async getEvents() {
    try {
      const events = await Event.find().populate("user", "name email");

      return events;
    } catch (error) {
      console.error(error);

      throw new Error("Error getting events");
    }
  }

  static async getEventById(id) {
    try {
      const event = await Event.findById(id).populate("user", "name email");

      return event;
    } catch (error) {
      console.error(error);

      throw new Error("Error getting event by id");
    }
  }

  static async updateEvent(id, data) {
    try {
      const event = await Event.findByIdAndUpdate(id, data).populate(
        "user",
        "name email"
      );

      return event;
    } catch (error) {
      console.error(error);

      throw new Error("Error updating event");
    }
  }

  static async deleteEvent(id) {
    try {
      const event = await Event.findByIdAndDelete(id);

      return event;
    } catch (error) {
      console.error(error);

      throw new Error("Error deleting event");
    }
  }
}
