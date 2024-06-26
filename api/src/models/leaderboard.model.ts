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
        default: new Date(),
      },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const LeaderBoardModel = model("Leaderboard", LeaderBoardSchema);

export default LeaderBoardModel;
