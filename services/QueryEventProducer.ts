import { QUERY_EVENT_EXCHANGE } from "../utils/constants";
import Producer from "./Producer";

export default class QueryEventProducer {

    p : Producer
 
    constructor(tableName : string) {
        this.p = new Producer(QUERY_EVENT_EXCHANGE, tableName)
    }

    publish(msg : string) {
        this.p.produce(msg)
    }
}