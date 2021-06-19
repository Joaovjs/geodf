import ICreateRockTypeDTO from '@modules/rocks/dtos/ICreateRockTypeDTO'
import IRockTypeRepository from '@modules/rocks/repositories/IRockTypeRepository'
import { EntityRepository, getRepository, Repository } from 'typeorm'
import RockType from '../entities/RockType'

@EntityRepository(RockType)
export default class RockTypeRepository implements IRockTypeRepository {
  private ormRepository: Repository<RockType>

  constructor() {
    this.ormRepository = getRepository(RockType)
  }

  public async getAll(): Promise<RockType[]> {
    const rockTypes = await this.ormRepository.find()

    return rockTypes
  }

  public async getByID(id: string): Promise<RockType | undefined> {
    const rockType = await this.ormRepository.findOne(id)

    return rockType
  }

  public async update(rockType: RockType): Promise<RockType> {
    await this.ormRepository.save(rockType)

    return rockType
  }

  public async create(data: ICreateRockTypeDTO): Promise<RockType> {
    const rockType = this.ormRepository.create(data)

    await this.ormRepository.save(rockType)

    return rockType
  }
}
