import { RESULT_EVENT_EXCHANGE } from "../utils/constants";
import Producer from "./Producer";

export default class ResultEventProducer {

    p : Producer
 
    constructor(tableName : string) {
        this.p = new Producer(RESULT_EVENT_EXCHANGE, tableName)
    }

    publish(msg : string) {
        this.p.produce(msg)
    }
}