
import { Channel, connect, Connection, Message, Replies } from "amqplib/callback_api";

const createConnection = async () : Promise<Connection> => {
    return new Promise((resolve, reject) => {
        connect((err : any, conn : Connection) => {
            if (err == null) { 
                resolve(conn)
            } else {
                reject(err)
            }
        })
    })
}

const createChannel = async (conn : Connection) : Promise<Channel> => {
    return new Promise((resolve, reject) => {
        conn.createChannel((err : any, channel : Channel) => {
            if (err == null) {
                resolve(channel)
            } else {
                reject(err)
            }
        })
    })
}

const createExchange = async (channel : Channel, exchangeName : string) : Promise<Replies.AssertExchange> => {
    return new Promise((resolve, reject) => {
        channel.assertExchange(exchangeName, 'direct', {
            durable: false
        }, (err : any, ex : Replies.AssertExchange) => {
            if (err == null) {
                resolve(ex)
            } else {
                reject(err)
            }
        })
    })
}

const createTemporaryQueue = async (channel : Channel) : Promise<string> => {
    return new Promise((resolve, reject) => {
        channel.assertQueue('', {
            exclusive: true
        }, (err : any, q : Replies.AssertQueue) => {
            if (err == null) {
                resolve(q.queue)
            } else {
                reject(err)
            }
        })
    })
}


const consume = async (channel : Channel, exchange : string, key : string, cb : (s : string) => void) : Promise<string> => {
    const ex = await createExchange(channel, exchange)
    const q = await createTemporaryQueue(channel)
    channel.bindQueue(q, ex.exchange, key)
    return new Promise((resolve, reject) => {
        channel.consume(q, (msg : Message | null) => {
            if (msg) {
                cb(msg.content.toString())
            } 
        })
    })
}

export {
    createChannel, 
    createConnection, 
    createExchange, 
    createTemporaryQueue, 
    consume
}