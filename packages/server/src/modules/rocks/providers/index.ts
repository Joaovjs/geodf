import { container } from 'tsyringe'
import RocksRepository from '../infra/typeorm/repositories/RocksRepository'
import RockTypeRepository from '../infra/typeorm/repositories/RockTypeRepository'
import IRocksRepository from '../repositories/IRocksRepository'
import IRockTypeRepository from '../repositories/IRockTypeRepository'

container.registerSingleton<IRockTypeRepository>(
  'RockTypeRepository',
  RockTypeRepository
)

container.registerSingleton<IRocksRepository>(
  'RocksRepository',
  RocksRepository
)
