import ICreateRockTypeDTO from '../dtos/ICreateRockTypeDTO'
import RockType from '../infra/typeorm/entities/RockType'

export default interface IRockTypeRepository {
  getAll(): Promise<RockType[]>
  getByID(id: string): Promise<RockType | undefined>
  update(rockType: RockType): Promise<RockType>
  create(media: ICreateRockTypeDTO): Promise<RockType>
}
