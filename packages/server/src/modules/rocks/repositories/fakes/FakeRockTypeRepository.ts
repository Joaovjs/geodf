import ICreateRockTypeDTO from '@modules/rocks/dtos/ICreateRockTypeDTO'
import RockType from '@modules/rocks/infra/typeorm/entities/RockType'
import { uuid } from 'uuidv4'
import IRockTypeRepository from '../IRockTypeRepository'

export default class FakeRockTypeRepository implements IRockTypeRepository {
  rockTypes: RockType[] = []

  public async getAll(): Promise<RockType[]> {
    return this.rockTypes
  }

  public async getByID(id: string): Promise<RockType | undefined> {
    return this.rockTypes.find(rockType => rockType.id === id)
  }

  public async update(rockType: RockType): Promise<RockType> {
    const RockTypeUpdatedIndex = this.rockTypes.findIndex(
      rockTypeFinded => rockTypeFinded.id === rockType.id
    )

    this.rockTypes[RockTypeUpdatedIndex] = rockType

    return rockType
  }

  public async create(data: ICreateRockTypeDTO): Promise<RockType> {
    const rockType = new RockType()

    Object.assign(rockType, { id: uuid(), ...data })

    this.rockTypes.push(rockType)

    return rockType
  }
}
