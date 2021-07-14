import AppError from '@shared/errors/AppError'
import FakeBuildingsRepository from '../repositories/fakes/FakeBuildingsRepository'
import UpdateBuildingService from './UpdateBuildingService'

let updateBuilding: UpdateBuildingService
let fakeBuildingsRepository: FakeBuildingsRepository

describe('UpdateBuilding', () => {
  beforeEach(async () => {
    fakeBuildingsRepository = new FakeBuildingsRepository()
    updateBuilding = new UpdateBuildingService(fakeBuildingsRepository)
  })

  it('Should be able to update a building', async () => {
    const building = await fakeBuildingsRepository.create({
      slug: 'slug-example',
      name: 'Building example',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    const buildingUpdated = await updateBuilding.execute({
      id: building.id,
      name: 'Building example edited'
    })

    expect(buildingUpdated.name).toBe('Building example edited')
  })

  it('Should not be able to update a building with a slug that already in use', async () => {
    fakeBuildingsRepository.create({
      slug: 'slug-example',
      name: 'Building example',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    const building = await fakeBuildingsRepository.create({
      slug: 'slug-example-two',
      name: 'Building example two',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    await expect(
      updateBuilding.execute({
        id: building.id,
        name: 'Building example edited',
        slug: 'slug-example'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update a non existing building', async () => {
    await expect(
      updateBuilding.execute({
        id: 'non-existing-building',
        name: 'Building example edited',
        slug: 'slug-example'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
