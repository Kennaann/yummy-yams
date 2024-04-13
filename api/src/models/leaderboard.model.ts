import { Schema, model } from "mongoose";
import { UserSchema } from "./user.model";
import { PastrySchema } from "./pastries.model";

export const LeaderBoardSchema = new Schema({
  isGameOpen: {
    type: Boolean,
    default: true,
  },
  wins: [
    {
      winner: {
        username: UserSchema.path("username"),
        email: UserSchema.path("email"),
      },
      prize: [
        {
          name: PastrySchema.path("name"),
          image: PastrySchema.path("image"),
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const LeaderBoardModel = model("Leaderboard", LeaderBoardSchema);

export default LeaderBoardModel;
