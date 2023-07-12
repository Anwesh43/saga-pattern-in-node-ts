
import { createChannel, createConnection, consume} from '../utils/PromisifiedMethods'

export default class Consumer {

    constructor(public exchangeName : string, public key : string) {

    }

    async start(cb : (arg0 : string) => void) {
        const conn = await createConnection()
        const channel = await createChannel(conn)
        consume(channel, this.exchangeName, this.key, cb)
        
    }

}