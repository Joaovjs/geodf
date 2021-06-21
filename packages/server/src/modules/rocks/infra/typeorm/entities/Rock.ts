import { Exclude } from 'class-transformer'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import RockType from './RockType'

@Entity('rocks')
export default class Rock {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column('uuid')
  @Exclude()
  type: string

  @ManyToOne(() => RockType)
  @JoinColumn({ name: 'type' })
  rockType: RockType

  @Column()
  locations: string

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
