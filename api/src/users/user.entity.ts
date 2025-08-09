import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  email: string;

  @Column()
  @Exclude()
  password?: string;
}

