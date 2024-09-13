import { Schema, model } from 'mongoose';

export const Vehicle = model(
  'Vehicle',
  new Schema(
    {
      plate: {
        type: String,
        unique: true,
        required: true
      },
      color: {
        type: String,
        required: true
      },
      model: {
        type: String,
        required: true
      },
      manufactureYear: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true,
        enum: ['available', 'unavailable'],
        default: 'available'
      }
    },
    { timestamps: true }
  )
);
