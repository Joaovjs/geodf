import ICreateBuildingDTO from '@modules/buildings/dtos/ICreateBuildingDTO'
import IBuildingsRepository from '@modules/buildings/repositories/IBuildingsRepository'
import { IPagination } from '@shared/interfaces/IPagination'
import { EntityRepository, getRepository, Repository } from 'typeorm'
import Building from '../entities/Building'

@EntityRepository(Building)
export default class BuildingRepository implements IBuildingsRepository {
  private ormRepository: Repository<Building>
  public count: number

  constructor() {
    this.ormRepository = getRepository(Building)
  }

  public async getAll({ page, N }: IPagination): Promise<Building[]> {
    const [buildings, count] = await this.ormRepository.findAndCount({
      take: N,
      skip: page,
      where: { status: true }
    })

    this.count = count
    return buildings
  }

  public async getByID(id: string): Promise<Building | undefined> {
    const building = await this.ormRepository.findOne(id)

    return building
  }

  public async getBySlug(slug: string): Promise<Building | undefined> {
    const building = await this.ormRepository.findOne({
      where: {
        slug: slug
      }
    })

    return building
  }

  public async getByIdOrSlug(id_or_slug: string): Promise<Building | undefined> {
    const building = await this.ormRepository.findOne({
      where: [
        { id: id_or_slug, status: true },
        { slug: id_or_slug, status: true }
      ],
      relations: ['rocks']
    })

    return building
  }

  public async update(building: Building): Promise<Building> {
    await this.ormRepository.save(building)

    return building
  }

  public async create(data: ICreateBuildingDTO): Promise<Building> {
    const building = this.ormRepository.create(data)

    await this.ormRepository.save(building)

    return building
  }

  public async delete(building: Building): Promise<void> {
    building.status = false
    await this.ormRepository.save(building)
  }
}
