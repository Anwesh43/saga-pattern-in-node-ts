import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class CustomUser {

    @PrimaryGeneratedColumn()
    id : number 

    @Column()
    name : string  

    @Column()
    age : number 
}