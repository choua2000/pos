import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Categorie {
    @PrimaryGeneratedColumn('uuid')  
    id!: string; 

    @Column({nullable: true})
    name!: string;

    @Column({nullable: true})
    description!: string;

    @CreateDateColumn()
    public created_at!: Date;

    @UpdateDateColumn()
    public updated_at!: Date;
}