import { Role } from 'src/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 63 })
  name: string;

  @Column({ length: 127, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'date', nullable: true })
  birthAt: Date;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ type: 'enum', enum: [1, 2], default: Role.User })
  role: number;
}
