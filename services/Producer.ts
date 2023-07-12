import { createChannel, createConnection, createExchange } from "../utils/PromisifiedMethods";

export default class Producer {

    constructor(private exchangeName : string, private key : string) {

    }

    async produce(msg : string) {
        const conn = await createConnection()
        const channel = await createChannel(conn)
        const ex = await createExchange(channel, this.exchangeName)
        channel.publish(ex.exchange, this.key, Buffer.from(msg))
    }
}

