import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'gallery' })
export class Gallery {
  @PrimaryGeneratedColumn()
  no: number;

  @ManyToOne(() => User, (user) => user.gallery)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column({ type: 'varchar' })
  place: string;

  @Column({ type: 'varchar' })
  lon: string;

  @Column({ type: 'varchar' })
  lat: string;

  @Column({ type: 'varchar' })
  images: string;

  @Column({ type: 'datetime' })
  upload_at: Date;
}
