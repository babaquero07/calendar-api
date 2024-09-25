import { Router } from "express";
import { EventsService } from "./events.service.js";
import { validate } from "../common/middlewares/validator.js";
import {
  newEventValidator,
  updateEventValidator,
} from "./middlewares/events-validator.js";

export const eventsRouter = Router();

eventsRouter.get("/", async (req, res) => {
  try {
    const events = await EventsService.getEvents();

    res.json({
      ok: true,
      events,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
});

eventsRouter.post("/", validate(newEventValidator), async (req, res) => {
  try {
    const { title, notes, start, end } = req.body;
    const { uid } = req.jwtData;

    const event = await EventsService.createEvent({
      title,
      notes,
      start,
      end,
      user_id: uid,
    });

    res.status(201).json({
      ok: true,
      message: "Event created",
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
});

eventsRouter.put("/:id", validate(updateEventValidator), async (req, res) => {
  try {
    const { id } = req.params;
    const { uid } = req.jwtData;
    const { ...data } = req.body;

    const event = await EventsService.getEventById(id);
    if (!event)
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });

    if (event.user._id.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "You don't have permissions to update this event",
      });

    const updatedEvent = await EventsService.updateEvent(id, data);

    res.json({
      ok: true,
      message: "Event updated",
      updatedEvent,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
});

eventsRouter.delete("/:id", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
});
