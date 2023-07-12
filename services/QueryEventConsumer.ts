import { DataSource } from "typeorm";
import CustomOrder from "../entities/Order";

import CustomUser from "../entities/User";

import { QUERY_EVENT_EXCHANGE } from "../utils/constants";

import Consumer from "./Consumer";
import Dispatcher from "./Dispatcher";
import Producer from "./Producer";

export default class QueryEventConsumer {
    c : Consumer

    constructor(private tableName : string, private d : Dispatcher, private ds: DataSource) {
        this.c = new Consumer(QUERY_EVENT_EXCHANGE, tableName)
        
    }

    execute() {
        this.c.start(async (msg : string) => {
            const msgParts = msg.split(" ")
            const UserRepository = this.ds.getRepository(CustomUser)
            const OrderRepository = this.ds.getRepository(CustomOrder)
            let newMsg : string = msg 
            if (this.tableName === "users") {
                if (msgParts[0] === 'insert') {
                    const user = new CustomUser()
                    user.name = msgParts[1]
                    user.age = parseInt(msgParts[2])
                    const insertResult = await UserRepository.insert(user)
                    newMsg = insertResult.raw
                }
            }
            if (this.tableName === "orders") {
                if (msgParts[0] === 'insert') {
                    const order = new CustomOrder()
                    order.items = parseInt(msgParts[1])
                    order.price = parseInt(msgParts[2])
                    order.data_to_be_delivered = msgParts[3]
                    const insertResult =  await OrderRepository.insert(order)
                    newMsg = insertResult.raw
                }
            }
                
            this.d.dispatch({
                tableName: this.tableName,
                type: 'result',
                data: msg 
            })
        })
    }
}

