import { Message } from "discord.js";
import { IBaseCommand, IBaseinteraction } from "../types/index";
import { BaseClient } from "./client.service";

export class BaseCommandClient implements IBaseCommand {
  public name: string;
  public description: string;
  public options: any[];

  constructor({ name = null, description = null, options = [] }) {
    this.name = name;
    this.description = description;
    this.options = options;
  }

  public execute(
    client: BaseClient,
    interaction: IBaseinteraction
  ): Promise<void | Message> | void | Message {}
}