import Dispatcher from "./Dispatcher";

export default class StdinProcessor {
    
    constructor(private d : Dispatcher) {
        
    }

    start() {
        process.stdin.resume()
        process.stdin.on('data', (data : Buffer) => {
            const msg = data.toString()
            const msgParts : string[] = msg.split(" ")
            this.d.dispatch({
                type: 'query',
                tableName: msgParts[0],
                data: msgParts.splice(1, msgParts.length - 1).join(" ")
            })
        })
    }
}