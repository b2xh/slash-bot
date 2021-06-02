import dotenv from "dotenv";
import { ISettings } from "./types";

dotenv.config();

export const settings: ISettings = {
  token: process.env.TOKEN,
  appID: "",
  ownerIDs: [],
  game: {
    content: "your notes",
    type: "WATCHING",
    status: "online",
  },
};
