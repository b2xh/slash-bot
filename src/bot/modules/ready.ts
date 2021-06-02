import { BaseClient } from '../../services/client.service';
import { BaseModuleClient } from '../../services/module.service';
import { success } from 'pogger';


export default class ReadyModule extends BaseModuleClient {
    constructor () {
        super({
            name: "ready",
            description: "test",
        })
    }
    public async execute(client: BaseClient) {
        success(`${client.user.username} successfully connected to Discord`)
    }
}