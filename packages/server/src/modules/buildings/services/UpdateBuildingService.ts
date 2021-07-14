import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IBuildingsRepository from '../repositories/IBuildingsRepository'
import Building from '../infra/typeorm/entities/Building'

interface IRequest {
  id: string
  name: string
  slug?: string
  description?: string
  location?: string
  thumbnail?: string
  images?: string[]
  references?: string[]
}

@injectable()
export default class UpdateBuildingService {
  constructor(
    @inject('BuildingsRepository')
    private buildingsRepository: IBuildingsRepository
  ) {}

  public async execute(request_data: IRequest): Promise<Building> {
    const building = await this.buildingsRepository.getByID(request_data.id)

    if (!building) {
      throw new AppError("this building doesn't exist")
    }

    building.slug = request_data.slug || building.slug
    const findBuildingWithSameSlug = await this.buildingsRepository.getBySlug(building.slug)

    if (findBuildingWithSameSlug && findBuildingWithSameSlug.id !== building.id) {
      throw new AppError('Already exist a building with this slug')
    }

    building.name = request_data.name
    building.description = request_data.description || building.description
    building.location = request_data.location || building.location
    building.thumbnail = request_data.thumbnail || building.thumbnail
    building.images = request_data.images || building.images
    building.references = request_data.references || building.references

    await this.buildingsRepository.update(building)

    return building
  }
}
