import ICreateBuildingRockDTO from '@modules/buildings/dtos/ICreateBuildingRockDTO'
import IBuildingsRocksRepository from '@modules/buildings/repositories/IBuildingsRocksRepository'
import { EntityRepository, getRepository, Repository } from 'typeorm'
import BuildingRock from '../entities/BuildingRock'

@EntityRepository(BuildingRock)
export default class BuildingRockRepository
  implements IBuildingsRocksRepository
{
  private ormRepository: Repository<BuildingRock>

  constructor() {
    this.ormRepository = getRepository(BuildingRock)
  }

  public async getAllFromBuilding(
    building_id: string
  ): Promise<BuildingRock[]> {
    const buildingRocks = await this.ormRepository.find({
      where: { status: true, building: building_id }
    })

    return buildingRocks
  }

  public async getAllFromRock(rock_id: string): Promise<BuildingRock[]> {
    const buildingRocks = await this.ormRepository.find({
      where: { status: true, rock: rock_id }
    })

    return buildingRocks
  }

  public async getByID(id: string): Promise<BuildingRock | undefined> {
    const buildingRock = await this.ormRepository.findOne(id)

    return buildingRock
  }

  public async update(buildingRock: BuildingRock): Promise<BuildingRock> {
    await this.ormRepository.save(buildingRock)

    return buildingRock
  }

  public async create(data: ICreateBuildingRockDTO): Promise<BuildingRock> {
    const buildingRock = this.ormRepository.create(data)

    await this.ormRepository.save(buildingRock)

    return buildingRock
  }

  public async delete(buildingRock: BuildingRock): Promise<void> {
    buildingRock.status = false
    await this.ormRepository.save(buildingRock)
  }
}
