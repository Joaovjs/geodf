import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IBuildingsRepository from '../repositories/IBuildingsRepository'

interface IRequest {
  id: string
}

@injectable()
export default class DeleteBuildingService {
  constructor(
    @inject('BuildingsRepository')
    private buildingsRepository: IBuildingsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const building = await this.buildingsRepository.getByID(id)

    if (!building) {
      throw new AppError("this building doesn't exist")
    }

    await this.buildingsRepository.delete(building)

    return true
  }
}
