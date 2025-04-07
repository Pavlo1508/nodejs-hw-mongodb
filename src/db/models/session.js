import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const SessionCollection = model('users', sessionSchema);
