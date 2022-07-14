import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";
import { EmployeeAddress } from "./EmployeeAddress";

@Entity("employee")
    export class Employee extends AbstractEntity{
        @PrimaryColumn({nullable:false})
        public id: string;

        @Column({nullable:false})
        public name: string;

        @Column({nullable:true})
        public password: string;

        @Column({nullable:false})
        public email: string;

        @Column({nullable:false})
        public joiningDate: Date

        @Column({nullable:false})
        public role: string;

        @Column({nullable:false})
        public status: string;

        @Column({nullable:false})
        public experience: string;

        @Column({nullable:true})
        public idproof: string;
        

        @ManyToOne(() => Department, { cascade: true })
        @JoinColumn()
        public department: Department;

        @OneToOne(() => EmployeeAddress, { cascade: true })
        @JoinColumn()
        employeeAddress:EmployeeAddress


       
    }