import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Profile } from "./profile";
import { Customer } from "./customer";
// import { Sale } from "./sale";
@Entity()
export class User {
    @PrimaryGeneratedColumn( "uuid" )
    id!: number;
    @Column({ nullable: true })
    firstname!: string;

    @Column({ nullable: true })
    lastname!: string;

    @Column({ nullable: true })
    email!: string;

    @Column({nullable: true})
    password!: string;

    @Column({default : "USER", enum : ["ADMIN","USER"]})
    role!: string;

    

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;
    @OneToOne(type => Profile, profile => profile.user, { cascade: true })
    @JoinColumn()
    profile!: Profile;

    // @OneToMany(() => Sale, sale => sale.user)
    // @JoinColumn()
    // sale!: Sale;
}