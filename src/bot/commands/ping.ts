import { BaseClient } from '../../services/client.service';
import { BaseCommandClient } from '../../services/command.service';
import { IBaseinteraction } from '../../types';


export default class PingCommand extends BaseCommandClient {
    constructor () {
        super({
            name: "ping",
            description: "pong",
            options: null
        })
    }

    public async execute(client: BaseClient, interaction: IBaseinteraction) {
        await client.API.callback(interaction, `Pong **${client.ws.ping}**ms`)
    }
}