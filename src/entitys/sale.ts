import { Customer } from './customer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne, Decimal128 } from "typeorm";
// import { User } from './user';
import { SaleItem } from './saleItem';
@Entity()
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    // @ManyToOne(() => User,(user) => user.sale) 
    // @JoinColumn()
    // user!: User;

    @ManyToOne(() => Customer,(customer) => customer.sale)
    @JoinColumn()
    customer!: Customer;

    @OneToMany(() => SaleItem, (saleItem) => saleItem.sale)
    @JoinColumn()
    saleItems!: SaleItem

    @Column('decimal', { precision: 10, scale: 2 })
    totalAmount!: Number;

    @Column({
        type: 'varchar', 
        enum: ['cash', 'card','credit'], 
        length: 50})
    paymentMethod!: 'cash' | 'card' | 'credit';

    @CreateDateColumn({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    public createdAt!: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    public updatedAt!: Date;
}