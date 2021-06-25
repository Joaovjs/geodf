import { inject, injectable } from 'tsyringe'
import { IPagination } from '@shared/interfaces/IPagination'
import IRocksRepository from '../repositories/IRocksRepository'
import Rock from '../infra/typeorm/entities/Rock'

@injectable()
export default class ListRocksService {
  constructor(
    @inject('RocksRepository')
    private rocksRepository: IRocksRepository
  ) {}

  public async execute(pagination?: IPagination): Promise<[Rock[], number]> {
    let count = 0

    const page = pagination?.page || 0
    const N = pagination?.N || 10

    const rocks = await this.rocksRepository.getAll({
      page: page > 0 ? (page - 1) * N : 0,
      N
    })

    count = this.rocksRepository.count

    return [rocks, count]
  }
}
