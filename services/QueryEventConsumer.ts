import { QUERY_EVENT_EXCHANGE } from "../utils/constants";
import Consumer from "./Consumer";
import Dispatcher from "./Dispatcher";
import Producer from "./Producer";

export default class QueryEventConsumer {
    c : Consumer

    constructor(private tableName : string, private d : Dispatcher) {
        this.c = new Consumer(QUERY_EVENT_EXCHANGE, tableName)
        
    }

    execute() {
        this.c.start((msg : string) => {
            this.d.dispatch({
                tableName: this.tableName,
                type: 'result',
                data: msg 
            })
        })
    }
}

