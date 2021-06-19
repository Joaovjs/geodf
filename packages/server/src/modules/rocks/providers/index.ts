import { container } from 'tsyringe'
import RockTypeRepository from '../infra/typeorm/repositories/RockTypeRepository'
import IRockTypeRepository from '../repositories/IRockTypeRepository'

container.registerSingleton<IRockTypeRepository>(
  'RockTypeRepository',
  RockTypeRepository
)
