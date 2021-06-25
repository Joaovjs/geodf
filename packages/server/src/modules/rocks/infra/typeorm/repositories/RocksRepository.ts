import ICreateRockDTO from '@modules/rocks/dtos/ICreateRockDTO'
import IRocksRepository from '@modules/rocks/repositories/IRocksRepository'
import { IPagination } from '@shared/interfaces/IPagination'
import { EntityRepository, getRepository, Repository } from 'typeorm'
import Rock from '../entities/Rock'

@EntityRepository(Rock)
export default class RockRepository implements IRocksRepository {
  private ormRepository: Repository<Rock>
  public count: number

  constructor() {
    this.ormRepository = getRepository(Rock)
  }

  public async getAll({ page, N }: IPagination): Promise<Rock[]> {
    const [rocks, count] = await this.ormRepository.findAndCount({
      take: N,
      skip: page,
      where: {
        status: true
      }
    })

    this.count = count
    return rocks
  }

  public async getByID(id: string): Promise<Rock | undefined> {
    const rock = await this.ormRepository.findOne(id)

    return rock
  }

  public async update(rock: Rock): Promise<Rock> {
    await this.ormRepository.save(rock)

    return rock
  }

  public async create(data: ICreateRockDTO): Promise<Rock> {
    const rock = this.ormRepository.create(data)

    await this.ormRepository.save(rock)

    return rock
  }

  public async delete(rock: Rock): Promise<void> {
    rock.status = false
    await this.ormRepository.save(rock)
  }
}
