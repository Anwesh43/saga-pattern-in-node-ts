import { config } from "dotenv";
import { DataSource } from "typeorm";
import CustomOrder from "../entities/Order";
import CustomUser from "../entities/User";

config()
const appDataSource = new DataSource({
    type:'postgres',
    host: process.env.hostname || '',
    port: parseInt(process.env.port || '5342'),
    database: process.env.database || '',
    username: process.env.username || '',
    password: process.env.password || '',
    entities: [CustomUser, CustomOrder],
    synchronize: true,
})

export default appDataSource 
