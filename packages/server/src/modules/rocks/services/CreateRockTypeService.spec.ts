import FakeRockTypeRepository from '../repositories/fakes/FakeRockTypeRepository'
import CreateRockTypeService from './CreateRockTypeService'

let fakeRockTypeRepository: FakeRockTypeRepository
let createRockType: CreateRockTypeService

describe('CreateRockType', () => {
  beforeEach(() => {
    fakeRockTypeRepository = new FakeRockTypeRepository()

    createRockType = new CreateRockTypeService(fakeRockTypeRepository)
  })

  it('should be able to create a rock type', async () => {
    const rockType = await createRockType.execute({
      name: 'Rock type',
      description: 'Description of rock type',
      created_by: 'jhon-doe-id'
    })

    expect(rockType).toHaveProperty('id')
    expect(rockType.name).toBe('Rock type')
  })
})
