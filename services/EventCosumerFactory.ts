import Dispatcher from "./Dispatcher";
import QueryEventConsumer from "./QueryEventConsumer";
import ResultEventConsumer from "./ResultEventConsumer";

export default class ConsumerFactory {

    static createAndStart(tableName : string, d : Dispatcher) {
        new ResultEventConsumer(tableName).start()
        new QueryEventConsumer(tableName, d).execute()
    }
}

