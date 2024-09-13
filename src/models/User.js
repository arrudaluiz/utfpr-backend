import { Schema, model } from 'mongoose';

export const User = model(
  'User',
  new Schema(
    {
      name: {
        type: String,
        required: true
      },
      surname: {
        type: String,
        required: true
      },
      username: {
        type: String,
        unique: true,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
      }
    },
    { timestamps: true }
  )
);
