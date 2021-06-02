import { BaseClient } from '../../services/client.service';
import { BaseModuleClient } from '../../services/module.service';


export default class UtilsEvents extends BaseModuleClient {
    constructor () {
        super({
            name: "raw",
            description: "interaction event",
        })
    }
    public async execute(client: BaseClient, packet) {
        if (packet.t === "INTERACTION_CREATE") {
            if (client.slashCommands.has(packet.d.data.name)) {
                client.slashCommands.get(packet.d.data.name).execute(client, packet.d)
            }
        }
    }
}