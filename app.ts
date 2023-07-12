import Dispatcher from "./services/Dispatcher"
import ConsumerFactory from "./services/EventCosumerFactory"
import StdinProcessor from "./services/StdinProcessor"

const start = async() => {
    
    const d : Dispatcher = new Dispatcher()
    d.init(["users", "orders"])

    ConsumerFactory.createAndStart("users", d)
    ConsumerFactory.createAndStart("orders", d)

    const sp : StdinProcessor = new StdinProcessor(d)
    sp.start()

}

start()