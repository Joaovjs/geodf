import ICreateBuildingRockDTO from '@modules/buildings/dtos/ICreateBuildingRockDTO'
import BuildingRock from '@modules/buildings/infra/typeorm/entities/BuildingRock'
import { removeObjectFromArray } from '@shared/utils'
import { uuid } from 'uuidv4'
import IBuildingsRocksRepository from '../IBuildingsRocksRepository'

export default class FakeBuildingsRocksRepository
  implements IBuildingsRocksRepository
{
  buildingsRocks: BuildingRock[] = []

  public async getAllFromBuilding(
    building_id: string
  ): Promise<BuildingRock[]> {
    return this.buildingsRocks.filter(
      BuildingRock => BuildingRock.building === building_id
    )
  }

  public async getAllFromRock(rock_id: string): Promise<BuildingRock[]> {
    return this.buildingsRocks.filter(
      BuildingRock => BuildingRock.rock === rock_id
    )
  }

  public async getByID(id: string): Promise<BuildingRock | undefined> {
    return this.buildingsRocks.find(buildingRock => buildingRock.id === id)
  }

  public async update(buildingRock: BuildingRock): Promise<BuildingRock> {
    const BuildingRockUpdatedIndex = this.buildingsRocks.findIndex(
      buildingRockFinded => buildingRockFinded.id === buildingRock.id
    )

    this.buildingsRocks[BuildingRockUpdatedIndex] = buildingRock

    return buildingRock
  }

  public async create(data: ICreateBuildingRockDTO): Promise<BuildingRock> {
    const buildingRock = new BuildingRock()

    Object.assign(buildingRock, { id: uuid(), ...data })

    this.buildingsRocks.push(buildingRock)

    return buildingRock
  }

  public async delete(buildingRock: BuildingRock): Promise<void> {
    removeObjectFromArray(this.buildingsRocks, buildingRock)
  }
}
