import { container } from 'tsyringe'
import ReferenceRepository from '../infra/typeorm/repositories/ReferenceRepository'
import IReferenceRepository from '../repositories/IReferenceRepository'

container.registerSingleton<IReferenceRepository>(
  'ReferenceRepository',
  ReferenceRepository
)
