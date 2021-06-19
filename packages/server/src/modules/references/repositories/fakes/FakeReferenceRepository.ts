import ICreateReferenceDTO from '@modules/references/dtos/ICreateReferenceDTO'
import Reference from '@modules/references/infra/typeorm/entities/Reference'
import { uuid } from 'uuidv4'
import IReferenceRepository from '../IReferenceRepository'

export default class FakeReferenceRepository implements IReferenceRepository {
  references: Reference[] = []
  count: number

  public async getReferences(ids: string[]): Promise<Reference[]> {
    const references = this.references.filter(findReference =>
      ids.includes(findReference.id)
    )

    return references
  }

  public async create(data: ICreateReferenceDTO): Promise<Reference> {
    const reference = new Reference()

    Object.assign(reference, { id: uuid(), ...data })

    this.references.push(reference)

    return reference
  }
}
