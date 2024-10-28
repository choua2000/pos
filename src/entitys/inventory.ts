import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Product } from "./product";
@Entity()
export class Inventory {
    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @OneToOne((type) => Product, (product) => product.saleItems)
    @JoinColumn()
    product!: Product;

    @Column({type: "int", default: 0})
    quantityIn!: number;

    @Column({type: "int", default: 0})
    quantityOut!: number;

    @Column({type: "int", default: 0}) 
    quantityTotal!: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt!: Date;

    @UpdateDateColumn({type: 'timestamp' , default: () => "CURRENT_TIMESTAMP" })
    public updatedAt!: Date;
}