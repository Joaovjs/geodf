import { Exclude } from 'class-transformer'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

@Entity('admins')
export default class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password?: string

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date
}
