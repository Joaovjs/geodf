import { IPagination } from '@shared/interfaces/IPagination'
import ICreateMediaDTO from '../dtos/ICreateMediaDTO'
import Media from '../infra/typeorm/entities/Media'

export default interface IMediasRepository {
  count: number
  getAll(pagination: IPagination): Promise<Media[]>
  findBySlug(media_slug: string): Promise<Media | undefined>
  create(media: ICreateMediaDTO): Promise<Media>
}
