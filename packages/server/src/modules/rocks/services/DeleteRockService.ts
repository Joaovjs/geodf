import { inject, injectable } from 'tsyringe'
import IRocksRepository from '../repositories/IRocksRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: string
}

@injectable()
export default class DeleteRockService {
  constructor(
    @inject('RocksRepository')
    private rocksRepository: IRocksRepository
  ) {}

  public async execute({ id }: IRequest): Promise<boolean> {
    const rock = await this.rocksRepository.getByID(id)

    if (!rock) {
      throw new AppError("this rock doesn't exist")
    }

    await this.rocksRepository.delete(rock)

    return true
  }
}
