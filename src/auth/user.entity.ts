import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../boards/board.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];

  async validatePassword(password: string): Promise<boolean> {
    let isValid = await bcrypt.compare(password, this.password);
    return isValid;
  }
}
