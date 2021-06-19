import { inject, injectable } from 'tsyringe'
import Reference from '../infra/typeorm/entities/Reference'
import IReferenceRepository from '../repositories/IReferenceRepository'

interface IRequest {
  reference_text: string
  link?: string
  created_by: string
}

@injectable()
export default class CreateReferenceService {
  constructor(
    @inject('ReferenceRepository')
    private referenceRepository: IReferenceRepository
  ) {}

  public async execute({
    reference_text,
    link,
    created_by
  }: IRequest): Promise<Reference> {
    const reference = await this.referenceRepository.create({
      reference: reference_text,
      link,
      created_by
    })

    return reference
  }
}
