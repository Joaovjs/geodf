import { inject, injectable } from 'tsyringe'
import IRocksRepository from '../repositories/IRocksRepository'
import Rock from '../infra/typeorm/entities/Rock'

interface IRequest {
  name: string
  description: string
  type: string
  locations?: string
  thumbnail?: string
  images?: string[]
  references?: string[]
  created_by: string
}

@injectable()
export default class CreateRockService {
  constructor(
    @inject('RocksRepository')
    private rocksRepository: IRocksRepository
  ) {}

  public async execute(request_data: IRequest): Promise<Rock> {
    const rock = await this.rocksRepository.create(request_data)

    return rock
  }
}
