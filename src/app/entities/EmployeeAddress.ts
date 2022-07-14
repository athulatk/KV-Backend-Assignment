import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";

@Entity("employeeaddress")
    export class EmployeeAddress extends AbstractEntity{
        @PrimaryGeneratedColumn("uuid")
        public id: string;

        @Column({nullable:false})
        public houseName: string;

        @Column({nullable:false})
        public streetName: string;

        @Column({nullable:false})
        public city: string;

        @Column({nullable:false})
        public state: string;

        @Column({nullable:false})
        public country: string;

        @Column({nullable:false})
        public zipCode: string; 
        
        // @OneToOne(() => Employee)
        // @JoinColumn()
        // employee:Employee
       
    }