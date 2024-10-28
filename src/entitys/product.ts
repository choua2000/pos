import { SaleItem } from './saleItem';
import { Entity , PrimaryGeneratedColumn, Column , CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
// import { Purchase } from './purchase';
@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @Column({nullable: true})
    stockQuantity!: string;

    @Column({nullable: true})
    category!: string;

    @OneToMany(() => SaleItem, (saleItem) => saleItem.product)
    @JoinColumn()
    public saleItems!: SaleItem[]

    // @ManyToOne(() => Purchase, (purchase) => purchase.product)
    // @JoinColumn()
    // public purchase!: Purchase

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public createdAt!: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public updatedAt!: Date;
}