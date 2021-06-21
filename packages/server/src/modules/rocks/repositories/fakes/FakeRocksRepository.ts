import ICreateRockDTO from '@modules/rocks/dtos/ICreateRockDTO'
import Rock from '@modules/rocks/infra/typeorm/entities/Rock'
import { removeObjectFromArray } from '@shared/utils'
import { uuid } from 'uuidv4'
import IRocksRepository from '../IRocksRepository'

export default class FakeRocksRepository implements IRocksRepository {
  rocks: Rock[] = []
  count: number

  public async getAll(): Promise<Rock[]> {
    return this.rocks
  }

  public async getByID(id: string): Promise<Rock | undefined> {
    return this.rocks.find(rock => rock.id === id)
  }

  public async update(rock: Rock): Promise<Rock> {
    const RockUpdatedIndex = this.rocks.findIndex(
      rockFinded => rockFinded.id === rock.id
    )

    this.rocks[RockUpdatedIndex] = rock

    return rock
  }

  public async create(data: ICreateRockDTO): Promise<Rock> {
    const rock = new Rock()

    Object.assign(rock, { id: uuid(), ...data })

    this.rocks.push(rock)

    return rock
  }

  public async delete(rock: Rock): Promise<void> {
    removeObjectFromArray(this.rocks, rock)
  }
}
