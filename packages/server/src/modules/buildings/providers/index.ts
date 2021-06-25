import { container } from 'tsyringe'
import BuildingsRepository from '../infra/typeorm/repositories/BuildingsRepository'
import BuildingsRocksRepository from '../infra/typeorm/repositories/BuildingsRocksRepository'
import IBuildingsRepository from '../repositories/IBuildingsRepository'
import IBuildingsRocksRepository from '../repositories/IBuildingsRocksRepository'

container.registerSingleton<IBuildingsRepository>('BuildingsRepository', BuildingsRepository)

container.registerSingleton<IBuildingsRocksRepository>('BuildingsRocksRepository', BuildingsRocksRepository)
