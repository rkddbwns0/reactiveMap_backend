import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'record' })
export class Record {
  @PrimaryGeneratedColumn()
  no: number;

  @ManyToOne(() => User, (user) => user.record)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar' })
  place: string;

  @Column({ type: 'varchar' })
  lon: string;

  @Column({ type: 'varchar' })
  lat: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar' })
  images: string;

  @Column({ type: 'datetime' })
  write_at: Date;
}
