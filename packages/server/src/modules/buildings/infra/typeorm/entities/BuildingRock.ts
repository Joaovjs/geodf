import { Exclude } from 'class-transformer'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('buildings_rocks')
export default class BuildingRock {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  building: string

  @Column('uuid')
  rock: string

  @Column()
  name: string

  @Column()
  description: string

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
