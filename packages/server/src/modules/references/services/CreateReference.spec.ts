import FakeReferenceRepository from '../repositories/fakes/FakeReferenceRepository'
import CreateReferenceService from './CreateReference'

let fakeReferenceRepository: FakeReferenceRepository
let createReference: CreateReferenceService

describe('CreateReference', () => {
  beforeEach(() => {
    fakeReferenceRepository = new FakeReferenceRepository()

    createReference = new CreateReferenceService(fakeReferenceRepository)
  })

  it('should be able to create a reference', async () => {
    const reference = await createReference.execute({
      reference_text: 'Reference to an author',
      created_by: 'jhon-doe-id'
    })

    expect(reference).toHaveProperty('id')
    expect(reference.reference).toBe('Reference to an author')
  })
})
