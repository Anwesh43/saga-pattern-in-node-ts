import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class CustomOrder {

    @PrimaryGeneratedColumn()
    id : number 

    @Column()
    items : number 

    @Column()
    price : number 

    @Column()
    data_to_be_delivered : string 
}