import { inject, injectable } from 'tsyringe'
import { IPagination } from '@shared/interfaces/IPagination'
import IBuildingsRepository from '../repositories/IBuildingsRepository'
import Building from '../infra/typeorm/entities/Building'

@injectable()
export default class ListBuildingsService {
  constructor(
    @inject('BuildingsRepository')
    private buildingsRepository: IBuildingsRepository
  ) {}

  public async execute(pagination?: IPagination): Promise<[Building[], number]> {
    let count = 0

    const page = pagination?.page || 0
    const N = pagination?.N || 10

    const buildings = await this.buildingsRepository.getAll({
      page: page > 0 ? (page - 1) * N : 0,
      N
    })

    count = this.buildingsRepository.count

    return [buildings, count]
  }
}
