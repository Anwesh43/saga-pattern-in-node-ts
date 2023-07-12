import Consumer from "./Consumer"
import {writeFileSync} from 'node:fs'
import { RESULT_EVENT_EXCHANGE } from "../utils/constants"

export default class ResultEventConsumer {

    c : Consumer 

    constructor(private tableName : string) {
        this.c = new Consumer(RESULT_EVENT_EXCHANGE, tableName)
    }

    start() {
        const messages : string[] = []
        this.c.start((msg) => {
            messages.push(msg)
            writeFileSync(`${this.tableName}.log.txt`, Buffer.from(messages.join("\n")))
        })
    }
}