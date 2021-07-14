import { inject, injectable } from 'tsyringe'
import IBuildingsRepository from '../repositories/IBuildingsRepository'
import Building from '../infra/typeorm/entities/Building'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id_or_slug: string
}

@injectable()
export default class ShowBuildingsService {
  constructor(
    @inject('BuildingsRepository')
    private buildingsRepository: IBuildingsRepository
  ) {}

  public async execute({ id_or_slug }: IRequest): Promise<Building | undefined> {
    const building = await this.buildingsRepository.getByIdOrSlug(id_or_slug)

    if (!building) {
      throw new AppError("this building doesn't exist")
    }

    return building
  }
}
