import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Sale } from "./sale";
import { Product } from "./product";
@Entity()
export class SaleItem {
    @PrimaryGeneratedColumn('uuid')   
    id!: number;

    @ManyToOne(() => Sale, (sale) => sale.saleItems)
    @JoinColumn()
    sale!: Sale;

    @ManyToOne(() => Product, (product) => product.saleItems)
    @JoinColumn()
    product!: Product;

    @Column('decimal', { precision: 10, scale: 2 })
    quantity!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column()
    total!: number;

    @CreateDateColumn({ type: 'timestamp' , default: () => "CURRENT_TIMESTAMP" })
    public createdAt!: Date;

    @UpdateDateColumn({type: 'timestamp' , default: () => "CURRENT_TIMESTAMP" })
    public updatedAt!: Date;
}