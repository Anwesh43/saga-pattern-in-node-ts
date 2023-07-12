import QueryEventProducer from "./QueryEventProducer";
import ResultEventProducer from "./ResultEventProducer";

export interface Event {
    type: 'query' | 'result'
    data : string,
    tableName : string
}

export default class Dispatcher {
    queryEventProducerMap : Record<string, QueryEventProducer> = {}
    resultEventProducerMap : Record<string, ResultEventProducer> = {}

    init(tableNames : Array<string>) {
        tableNames.forEach((t : string) => {
            this.queryEventProducerMap[t] = new QueryEventProducer(t)
            this.resultEventProducerMap[t] = new ResultEventProducer(t)
        })
    }

    dispatch(e : Event) {
        if (e.type === 'query') {
            this.queryEventProducerMap[e.tableName].publish(e.data)
        } else {
            this.resultEventProducerMap[e.tableName].publish(e.data)
        }
    }
}
