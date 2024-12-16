import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'bookmark' })
export class Bookmark {
  @PrimaryGeneratedColumn()
  no: number;

  @ManyToOne(() => User, (user) => user.bookmark)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column({ type: 'varchar' })
  place: string;

  @Column({ type: 'varchar' })
  lon: string;

  @Column({ type: 'varchar' })
  lat: string;

  @Column({ type: 'datetime' })
  bookmark_at: Date;
}
