import ICreateBuildingDTO from '@modules/buildings/dtos/ICreateBuildingDTO'
import Building from '@modules/buildings/infra/typeorm/entities/Building'
import { removeObjectFromArray } from '@shared/utils'
import { uuid } from 'uuidv4'
import IBuildingsRepository from '../IBuildingsRepository'

export default class FakeBuildingsRepository implements IBuildingsRepository {
  buildings: Building[] = []
  count: number

  public async getAll(): Promise<Building[]> {
    return this.buildings
  }

  public async getByID(id: string): Promise<Building | undefined> {
    return this.buildings.find(building => building.id === id)
  }

  public async getBySlug(slug: string): Promise<Building | undefined> {
    return this.buildings.find(building => building.slug === slug)
  }

  public async getByIdOrSlug(id_or_slug: string): Promise<Building | undefined> {
    return this.buildings.find(building => building.slug === id_or_slug || building.id === id_or_slug)
  }

  public async update(building: Building): Promise<Building> {
    const BuildingUpdatedIndex = this.buildings.findIndex(buildingFinded => buildingFinded.id === building.id)

    this.buildings[BuildingUpdatedIndex] = building

    return building
  }

  public async create(data: ICreateBuildingDTO): Promise<Building> {
    const building = new Building()

    Object.assign(building, { id: uuid(), ...data })

    this.buildings.push(building)

    return building
  }

  public async delete(building: Building): Promise<void> {
    removeObjectFromArray(this.buildings, building)
  }
}
