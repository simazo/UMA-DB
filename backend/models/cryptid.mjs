import { Schema, model } from "mongoose";

const cryptidSchema = new Schema(
  {
    name: {
      type: String, 
      required: true,
      maxlength: 50,
      default: '',
    },
    size: {
      type: String,
      enum: ['S', 'M', 'L'],
      maxlength: 1,
      required: true,
    },
    area: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      required: true,
      maxlength: 4000,
      default: '',
    },
    video: {
      type: [String],
      default: [],
    },
    reference: {
      type: [
        {
          title: { type: String },
          link: { type: String },
        },
      ],
      default: [],
    },
    related_uma: {
      type: [Number],
      default: [],
    }
  }
);

export const Cryptid = model("Cryptid", cryptidSchema);