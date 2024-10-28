import { Entity , PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne} from 'typeorm';
import { Purchase } from './purchase';
@Entity()
export class Supplier {
    @PrimaryGeneratedColumn('uuid')
    id!: number;
    @Column({nullable: true})
    name!: string;
    @Column({nullable: true})
    contactInfo!: string;

    @OneToMany((type) => Purchase, (purchase) => purchase.supplier)
    @JoinColumn()
    public purchase!: Purchase[]
    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public created_at!: Date;
    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public updated_at!: Date;
}

