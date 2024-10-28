import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user";
@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')   
    id!: string;
    @Column({nullable: true})
    url!: string;
    @Column({nullable: true})
    userId!: string;
    @CreateDateColumn()
    created_at!: Date;
    @UpdateDateColumn()
    updated_at!: Date;
    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn()
    user!: User
}