import { IPagination } from '@shared/interfaces/IPagination'
import ICreateRockTypeDTO from '../dtos/ICreateRockTypeDTO'
import Rock from '../infra/typeorm/entities/Rock'

export default interface IRocksRepository {
  count: number
  getAll(pagination: IPagination): Promise<Rock[]>
  getByID(id: string): Promise<Rock | undefined>
  update(rock: Rock): Promise<Rock>
  create(data: ICreateRockTypeDTO): Promise<Rock>
  delete(rock: Rock): Promise<void>
}
