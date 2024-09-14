import { Schema, model } from 'mongoose';

export const Timetable = model(
  'Timetable',
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
      },
      startTime: {
        type: Date,
        required: true
      },
      endTime: {
        type: Date,
        required: true
      }
    },
    { timestamps: true }
  )
);
