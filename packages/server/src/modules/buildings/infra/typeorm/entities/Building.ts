import { Exclude } from 'class-transformer'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('buildings')
export default class Building {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  slug: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  location: string

  @Column()
  thumbnail: string

  @Column('varchar', { array: true })
  images: string[]

  @Column('uuid', { array: true })
  references: string[]

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
