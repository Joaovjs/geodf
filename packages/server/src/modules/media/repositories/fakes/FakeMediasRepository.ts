import ICreateMediaDTO from '@modules/media/dtos/ICreateMediaDTO'
import Media from '@modules/media/infra/typeorm/entities/Media'
import { IPagination } from '@shared/interfaces/IPagination'
import { uuid } from 'uuidv4'
import IMediasRepository from '../IMediasRepository'

export default class FakeMediasRepository implements IMediasRepository {
  medias: Media[] = []
  count: number

  public async getAll(_: IPagination): Promise<Media[]> {
    this.count = this.medias.length
    return this.medias
  }

  public async findBySlug(media_slug: string): Promise<Media | undefined> {
    const admin = this.medias.find(findMedia => findMedia.slug === media_slug)

    return admin
  }

  public async create(media_data: ICreateMediaDTO): Promise<Media> {
    const media = new Media()

    Object.assign(media, { id: uuid(), ...media_data })

    this.medias.push(media)

    return media
  }
}
