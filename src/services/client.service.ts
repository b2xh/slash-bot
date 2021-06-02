import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import { settings } from "../settings";
import { BaseCommandClient } from "./command.service";
import { resolve } from "path";
import { BaseModuleClient } from "./module.service";
import { API } from "./api.service";
import { success } from "pogger";

export class BaseClient extends Client {
  public slashCommands: Collection<string, BaseCommandClient> = new Collection();
  public API: API = new API();

  public constructor() {
    super({
      presence: {
        activity: {
          name: settings.game.content || "bot",
          type: settings.game.type || "WATCHING",
        },
        status: settings.game.status || "online",
      },
    });
  }

  private async loadSlash() {
    const commandFolders: string[] = readdirSync(
      resolve(__dirname, "..", "bot", "commands")
    );
    for (var folder of commandFolders) {
      const command: BaseCommandClient = new (require(resolve(
        __dirname,
        "..",
        "bot",
        "commands",
        folder
      )).default)();
      success(command.name + " slash command loaded (" + folder + ")");
      await this.slashCommands.set(command.name, command);
      this.API.post(command.name, command.description, command.options);
    }
  }

  private async loadModules() {
    const moduleFolders: string[] = readdirSync(
      resolve(__dirname, "..", "bot", "modules")
    );
    for (var folder of moduleFolders) {
      const module: BaseModuleClient = new (require(resolve(
        __dirname,
        "..",
        "bot",
        "modules",
        folder
      )).default)();
      success(module.name + " module loaded (" + folder + ") ");
      this.on(module.name, module.execute.bind(null, this));
    }
  }

  public async connect() {
    await this.login(settings.token);
    await this.loadModules();
    await this.loadSlash();
  }
}
