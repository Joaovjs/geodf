import IRocksRepository from '@modules/rocks/repositories/IRocksRepository'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import BuildingRock from '../infra/typeorm/entities/BuildingRock'
import IBuildingsRepository from '../repositories/IBuildingsRepository'
import IBuildingsRocksRepository from '../repositories/IBuildingsRocksRepository'

interface IRequest {
  rock_id: string
  building_id: string
  name: string
  description: string
  images?: string[]
  references?: string[]
  created_by: string
}

@injectable()
export default class CreateBuildingRockService {
  constructor(
    @inject('BuildingsRocksRepository')
    private buildingsRocksRepository: IBuildingsRocksRepository,

    @inject('BuildingsRepository')
    private buildingsRepository: IBuildingsRepository,

    @inject('RocksRepository')
    private rocksRepository: IRocksRepository
  ) {}

  public async execute(request_data: IRequest): Promise<BuildingRock> {
    const rock = await this.rocksRepository.getByID(request_data.rock_id)

    if (!rock) {
      throw new AppError('This rock does not exist')
    }
    const building = await this.buildingsRepository.getByID(request_data.building_id)

    if (!building) {
      throw new AppError('This building does not exist')
    }

    const buildingRock = await this.buildingsRocksRepository.create(request_data)

    return buildingRock
  }
}
