import { IBaseModule } from "../types/index";
import { BaseClient } from "./client.service";

export class BaseModuleClient implements IBaseModule {
  public name: string;
  public description: string;

  constructor({ name = null, description = null }) {
    this.name = name;
    this.description = description;
  }

  public execute(client: BaseClient, ...args): Promise<void> | void {}
}
