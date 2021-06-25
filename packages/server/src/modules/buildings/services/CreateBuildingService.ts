import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import Building from '../infra/typeorm/entities/Building'
import IBuildingsRepository from '../repositories/IBuildingsRepository'

interface IRequest {
  slug: string
  name: string
  description: string
  location?: string
  thumbnail?: string
  images?: string[]
  references?: string[]
  created_by: string
}

@injectable()
export default class CreateBuildingService {
  constructor(
    @inject('BuildingsRepository')
    private buildingsRepository: IBuildingsRepository
  ) {}

  public async execute(request_data: IRequest): Promise<Building> {
    const findBuildingWithSameSlug = await this.buildingsRepository.getBySlug(request_data.slug)

    if (findBuildingWithSameSlug) {
      throw new AppError('Already exist a building with this slug')
    }

    const building = await this.buildingsRepository.create(request_data)

    return building
  }
}
