import { inject, injectable } from 'tsyringe'
import RockType from '../infra/typeorm/entities/RockType'
import IRockTypeRepository from '../repositories/IRockTypeRepository'

interface IRequest {
  name: string
  description: string
  references?: string[]
  created_by: string
}

@injectable()
export default class CreateRockTypeService {
  constructor(
    @inject('RockTypeRepository')
    private rockTypeRepository: IRockTypeRepository
  ) {}

  public async execute({
    name,
    description,
    references,
    created_by
  }: IRequest): Promise<RockType> {
    const rockType = await this.rockTypeRepository.create({
      name,
      description,
      references,
      created_by
    })

    return rockType
  }
}
