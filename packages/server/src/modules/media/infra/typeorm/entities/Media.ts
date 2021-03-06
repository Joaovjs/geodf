import { Exclude } from 'class-transformer'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('medias')
export default class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  slug: string

  @Column()
  title: string

  @Column()
  alt: string

  @Column()
  description: string

  @Column()
  @Exclude()
  status: boolean

  @Column()
  created_by: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
