import Rock from '@modules/rocks/infra/typeorm/entities/Rock'
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
import Building from './Building'

@Entity('buildings_rocks')
export default class BuildingRock {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  @Exclude()
  building_id: string

  @ManyToOne(() => Building, building => building.rocks)
  @JoinColumn({ name: 'building_id' })
  building: Building

  @Column('uuid')
  @Exclude()
  rock_id: string

  @ManyToOne(() => Rock, rock => rock.buildingsRocks)
  @JoinColumn({ name: 'rock_id' })
  rock: Rock

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
