import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Sale } from "./sale";
@Entity()
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({nullable: true})
    name!: string;

    @Column({nullable: true})
    email!: string;

    @Column({nullable: true})
    phone!: string;

    @Column({type: "text", array: true, nullable: true})
    address!:Array<[
        village: string,
        city: string,
        country: string
    ]>;   

    @OneToMany(() => Sale, (sale) => sale.customer)
    @JoinColumn()
    public sale!: Sale

    @CreateDateColumn({ type: "timestamp" , default: () => "CURRENT_TIMESTAMP"})
    public createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" , default: () => "CURRENT_TIMESTAMP"}) 
    public updatedAt!: Date;
}