import { IPagination } from '@shared/interfaces/IPagination'
import ICreateBuildingDTO from '../dtos/ICreateBuildingDTO'
import Building from '../infra/typeorm/entities/Building'

export default interface IBuildingsRepository {
  count: number
  getAll(pagination: IPagination): Promise<Building[]>
  getByID(id: string): Promise<Building | undefined>
  update(building: Building): Promise<Building>
  create(data: ICreateBuildingDTO): Promise<Building>
  delete(building: Building): Promise<void>
}
