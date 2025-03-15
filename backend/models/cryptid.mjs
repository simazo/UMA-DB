import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cryptidSchema = new Schema(
  {
    _id: {
      type: String,
    },
    id: {
      type: Number, // 画像フォルダの番号（事前に画像作成時に手動採番）
      required: true,
      unique: true,
    },
    name: {
      type: String, 
      required: true,
      maxlength: 50,
    },
    alias: {
      type: String,
      default: '',
      maxlength: 100,
    }, 
    size: {
      type: String,
      enum: ['S', 'M', 'L', 'XL'],
      required: true,
    },
    size_details: {
      type: String,
      default: '',
      maxlength: 50,
    },
    area: {
      type: Number,
      required: true,
      min: 1,
    },
    region: {
      type: Number,
      required: true,
      min: 1,
    },
    species_type: {
      type: Number,
      required: true,
      min: 1,
    },
    credibility: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
      maxlength: 4000,
    },
    main_sighting_location: {
      type: String,
      required: true,
      maxlength: 100,
    },
    first_sighting: {
      type: String,
      required: true,
      maxlength: 100,
    },
    video: {
      type: [String],
      default: [],
      validate: {
        validator: function (urls) {
          return urls.every(url => /^https?:\/\/[\w.-]+(\.[\w.-]+)+[/#?]?.*$/.test(url));
        },
        message: "Invalid video URL format",
      },
    },
    reference: {
      type: [
        {
          title: { type: String, required: true },
          link: { 
            type: String, 
            required: true,
            validate: {
              validator: function (url) {
                return /^https?:\/\/[\w.-]+(\.[\w.-]+)+[/#?]?.*$/.test(url);
              },
              message: "Invalid reference URL format",
            },
          },
        },
      ],
      default: [],
    },
    related_uma: {
      type: [Number], // _idと紐づけるのではないのでSchema.Types.ObjectIdを使わない
      default: [],
    }
  },
  { timestamps: true } 
);

cryptidSchema.plugin(mongoosePaginate);

export const Cryptid = model("Cryptid", cryptidSchema);