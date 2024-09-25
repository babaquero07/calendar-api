import { Router } from "express";
import { EventsService } from "./events.service.js";
import { validate } from "../common/middlewares/validator.js";
import { newEventValidator } from "./middlewares/events-validator.js";

export const eventsRouter = Router();

eventsRouter.get("/", async (req, res) => {
  try {
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

eventsRouter.put("/:id", async (req, res) => {
  try {
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
