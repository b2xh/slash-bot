import { ActivityType, PresenceStatusData } from "discord.js";

export interface ISettings {
  token: string;
  appID: string;
  game?: {
    content?: string;
    type?: ActivityType;
    status?: PresenceStatusData;
  };
  ownerIDs: string[];
}

export interface IBaseCommand {
  name: string;
  description: string;
  options: IBaseOptions[];
}

export interface IBaseOptions {
  name: string;
  value: string;
}

export interface IBaseinteraction {
  data?: {
    name?: string;
    description: string;
    options: IBaseOptions[];
  };
  member: {
    user: {
      id: number;
      username: string;
      avatar: string;
      discriminator: string;
      public_flags: number;
    };
    role: string[];
    premium_since?: string;
    permissions: string;
    pending: false;
    nick?: string;
    mute: false;
    joined_at: string;
    is_pending: boolean;
    deaf: boolean;
  };
  channel_id: string;
  guild_id: string;
  type: number;
  id: string;
  token: string;
}

export interface IBaseModule {
  name: string;
  description: string;
}

export interface IAPIBaseCommand {
  id: string;
  application_id: string;
  name: string;
  version: string;
  default_permission: boolean;
}
