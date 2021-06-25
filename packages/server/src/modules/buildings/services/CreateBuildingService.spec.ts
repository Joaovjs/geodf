import AppError from '@shared/errors/AppError'
import FakeBuildingsRepository from '../repositories/fakes/FakeBuildingsRepository'
import CreateBuildingService from './CreateBuildingService'

let createBuilding: CreateBuildingService
let fakeBuildingsRepository: FakeBuildingsRepository

describe('CreateBuilding', () => {
  beforeEach(async () => {
    fakeBuildingsRepository = new FakeBuildingsRepository()
    createBuilding = new CreateBuildingService(fakeBuildingsRepository)
  })

  it('Should be able to create a building', async () => {
    const rock = await createBuilding.execute({
      slug: 'slug-example',
      name: 'Building example',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    expect(rock).toHaveProperty('id')
    expect(rock.name).toBe('Building example')
  })

  it('Should not be able to create a building', async () => {
    await createBuilding.execute({
      slug: 'slug-example',
      name: 'Building example',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    await expect(
      createBuilding.execute({
        slug: 'slug-example',
        name: 'Building example',
        description: 'Lorem ipsum',
        created_by: 'jhon-doe-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
