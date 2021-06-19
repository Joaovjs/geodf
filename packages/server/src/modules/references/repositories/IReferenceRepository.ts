import ICreateReferenceDTO from '../dtos/ICreateReferenceDTO'
import Reference from '../infra/typeorm/entities/Reference'

export default interface IReferenceRepository {
  getReferences(ids: string[]): Promise<Reference[]>
  create(media: ICreateReferenceDTO): Promise<Reference>
}
