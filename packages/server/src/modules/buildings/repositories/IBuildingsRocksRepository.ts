import ICreateBuildingRockDTO from '../dtos/ICreateBuildingRockDTO'
import BuildingRock from '../infra/typeorm/entities/BuildingRock'

export default interface IBuildingsRocksRepository {
  getAllFromBuilding(building_id: string): Promise<BuildingRock[]>
  getAllFromRock(rock_id: string): Promise<BuildingRock[]>
  getByID(id: string): Promise<BuildingRock | undefined>
  update(buildingRock: BuildingRock): Promise<BuildingRock>
  create(media: ICreateBuildingRockDTO): Promise<BuildingRock>
  delete(buildingRock: BuildingRock): Promise<void>
}
