import fetch from "node-fetch";

import { settings } from "../settings";
import { IBaseinteraction, IBaseOptions } from "../types";

export class API {
  private baseURL: string = `https://discord.com/api/v8`;

  /**
   * @name post
   * @example <API>.post("ping", "pong", null)
   */
  public async post(
    name: string,
    description: string,
    options: IBaseOptions[]
  ) {
    try {
      await fetch(`${this.baseURL}/applications/${settings.appID}/commands`, {
        method: "POST",
        body: JSON.stringify({ name, description, options }),
        headers: {
          Authorization: `Bot ${settings.token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * @name delete
   * @example <API>.delete("CommandID")
   */
  public async delete(command_id: string): Promise<void | number> {
    try {
      var res: number = 200;
      await fetch(
        `${this.baseURL}/applications/${settings.appID}/commands/${command_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bot ${settings.token}`,
          },
        }
      ).then((a) => (res = a.status));
      return res;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @name callback
   * @example <API>.callback(interaction, "pong")
   */
  public async callback(interaction: IBaseinteraction, message: string) {
    try {
      var data = {
        content: message,
      };

      const body = {
        type: 4,
        data,
      };
      await fetch(
        `${this.baseURL}/interactions/${interaction.id}/${interaction.token}/callback`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bot ${settings.token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      throw e;
    }
  }

  /**
   * @name fetch
   * @example <API>.fetch();
   */
  public async fetch() {
    var result;
    await fetch(`${this.baseURL}/applications/${settings.appID}/commands`, {
      method: "GET",
      headers: {
        Authorization: `Bot ${settings.token}`,
        "Content-Type": "application/json",
      },
    }).then(async (res) => (result = await res.json()));
    return result ? result : [];
  }
}
