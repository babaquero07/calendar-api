import mongoose from "mongoose";

const { Schema } = mongoose;

const EventSchema = new Schema({
  title: { type: String, required: true },
  notes: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Event = mongoose.model("Event", EventSchema);
