import ICreateReferenceDTO from '@modules/references/dtos/ICreateReferenceDTO'
import IReferenceRepository from '@modules/references/repositories/IReferenceRepository'
import { EntityRepository, getRepository, Repository } from 'typeorm'
import Reference from '../entities/Reference'

@EntityRepository(Reference)
export default class ReferenceRepository implements IReferenceRepository {
  private ormRepository: Repository<Reference>

  constructor() {
    this.ormRepository = getRepository(Reference)
  }

  public async getReferences(ids: string[]): Promise<Reference[]> {
    const references = await this.ormRepository.findByIds(ids)

    return references
  }

  public async create(data: ICreateReferenceDTO): Promise<Reference> {
    const reference = this.ormRepository.create(data)

    await this.ormRepository.save(reference)

    return reference
  }
}
