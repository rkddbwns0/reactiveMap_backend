import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({ type: 'varchar' })
  provider: string;

  @Column({ type: 'varchar' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  kakaoId: string;

  @Column({ type: 'varchar', default: '' })
  refresh_token: string;

  @CreateDateColumn({ type: 'datetime' })
  createAt: Date;
}
