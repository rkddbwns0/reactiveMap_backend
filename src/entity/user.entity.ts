import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// name : 테이블 이름
// UserEntity 안에 있는 내용은 Colum 생성 및 type 설정
@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  password: string;
}
