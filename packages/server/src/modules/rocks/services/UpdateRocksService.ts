import { inject, injectable } from 'tsyringe'
import IRocksRepository from '../repositories/IRocksRepository'
import AppError from '@shared/errors/AppError'
import Rock from '../infra/typeorm/entities/Rock'

interface IRequest {
  id: string
  name: string
  description?: string
  type?: string
  locations?: string
  thumbnail?: string
  images?: string[]
  references?: string[]
}

@injectable()
export default class UpdateRockService {
  constructor(
    @inject('RocksRepository')
    private rocksRepository: IRocksRepository
  ) {}

  public async execute(request_data: IRequest): Promise<Rock> {
    const rock = await this.rocksRepository.getByID(request_data.id)

    if (!rock) {
      throw new AppError("this rock doesn't exist")
    }

    rock.name = request_data.name
    rock.description = request_data.description || rock.description
    rock.type = request_data.type || rock.type
    rock.locations = request_data.locations || rock.locations
    rock.thumbnail = request_data.thumbnail || rock.thumbnail
    rock.images = request_data.images || rock.images
    rock.references = request_data.references || rock.references

    await this.rocksRepository.update(rock)

    return rock
  }
}
