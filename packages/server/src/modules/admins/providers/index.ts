import { container } from 'tsyringe'
import AdminsRepository from '../infra/typeorm/repositories/AdminsRepository'
import IAdminsRepository from '../repositories/IAdminsRepository'
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider'
import IHashProvider from './HashProvider/models/IHashProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)

container.registerSingleton<IAdminsRepository>(
  'AdminsRepository',
  AdminsRepository
)
