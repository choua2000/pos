
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
// import { Product } from "./product";
import { Supplier } from "./supplier";
@Entity()
export class Purchase {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    // @OneToMany(() => Product, (product) => product.purchase)
    // @JoinColumn()
    // product!: Product[];

    @ManyToOne(() => Supplier, (supplier) => supplier.purchase)
    @JoinColumn()
    supplier!: Supplier;

    @Column('decimal', { precision: 10, scale: 2 })
    purchasePrice!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    totalCost!: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt!:Date

}