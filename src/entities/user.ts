import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Record } from './record';
import { Bookmark } from './bookmark';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({ type: 'varchar' })
  provider: string;

  @Column({ type: 'varchar', unique: true })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  kakaoId: string;

  @Column({ type: 'varchar' })
  profile_image: string;

  @Column({ type: 'varchar', default: null })
  refresh_token: string;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;

  @OneToMany((type) => Record, (record) => record.user)
  record: Record[];

  @OneToMany((type) => Bookmark, (bookmark) => bookmark.user)
  bookmark: Bookmark[];
}
