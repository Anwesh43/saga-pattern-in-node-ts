import { DataSource } from "typeorm"
import appDataSource from "./services/AppDataSource"
import Dispatcher from "./services/Dispatcher"
import ConsumerFactory from "./services/EventCosumerFactory"
import StdinProcessor from "./services/StdinProcessor"
import { config } from "dotenv" 
const start = async() => {
    config()
    const d : Dispatcher = new Dispatcher()
    d.init(["users", "orders"])
    await appDataSource.initialize()
    console.log("Connected to postgres")
    ConsumerFactory.createAndStart("users", d, appDataSource)
    ConsumerFactory.createAndStart("orders", d, appDataSource)

    const sp : StdinProcessor = new StdinProcessor(d)
    sp.start()

}

start()