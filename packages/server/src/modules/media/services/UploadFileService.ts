import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import IMediasRepository from '../repositories/IMediasRepository'
import Media from '../infra/typeorm/entities/Media'
import AppError from '@shared/errors/AppError'

interface IRequest {
  slug: string
  title?: string
  description?: string
  alt?: string
  created_by: string
}

@injectable()
export default class UploadFileService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('MediasRepository')
    private mediasRepository: IMediasRepository
  ) {}

  public async execute({
    slug,
    title,
    description,
    alt,
    created_by
  }: IRequest): Promise<Media> {
    const sameNameFile = await this.mediasRepository.findBySlug(slug)

    if (sameNameFile) {
      throw new AppError('There is already a file with same name generated.')
    }

    const fileName = await this.storageProvider.saveFile(slug, 'media')

    const media = await this.mediasRepository.create({
      slug: fileName,
      title,
      description,
      alt,
      created_by
    })

    return media
  }
}
