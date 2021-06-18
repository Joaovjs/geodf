import { container } from 'tsyringe'
import MediasRepository from '../infra/typeorm/repositories/MediasRepository'
import IMediasRepository from '../repositories/IMediasRepository'

container.registerSingleton<IMediasRepository>(
  'MediasRepository',
  MediasRepository
)
