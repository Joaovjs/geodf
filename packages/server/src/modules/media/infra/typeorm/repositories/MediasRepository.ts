import ICreateMediaDTO from '@modules/media/dtos/ICreateMediaDTO'
import IMediasRepository from '@modules/media/repositories/IMediasRepository'
import { IPagination } from '@shared/interfaces/IPagination'
import { EntityRepository, getRepository, Repository } from 'typeorm'
import Media from '../entities/Media'

@EntityRepository(Media)
export default class MediasRepository implements IMediasRepository {
  private ormRepository: Repository<Media>
  public count: number

  constructor() {
    this.ormRepository = getRepository(Media)
  }

  public async getAll({ page, N }: IPagination): Promise<Media[]> {
    const [medias, count] = await this.ormRepository.findAndCount({
      take: N,
      skip: page
    })

    this.count = count
    return medias
  }

  public async findBySlug(slug: string): Promise<Media | undefined> {
    const media = await this.ormRepository.findOne({ slug: slug })

    return media
  }

  public async create(media_data: ICreateMediaDTO): Promise<Media> {
    const media = this.ormRepository.create(media_data)

    await this.ormRepository.save(media)

    return media
  }
}
