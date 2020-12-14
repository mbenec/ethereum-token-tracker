import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Token {
    @PrimaryColumn()
    id?: string;

    @Column({ type: 'timestamp' })
    timestamp!: Date;

    @Column()
    name!: string;

    @Column()
    symbol!: string;
}
