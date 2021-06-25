import AppError from '@shared/errors/AppError'
import FakeBuildingsRepository from '../repositories/fakes/FakeBuildingsRepository'
import DeleteBuildingService from './DeleteBuildingService'

let deleteBuilding: DeleteBuildingService
let fakeBuildingsRepository: FakeBuildingsRepository

describe('DeleteBuilding', () => {
  beforeEach(async () => {
    fakeBuildingsRepository = new FakeBuildingsRepository()
    deleteBuilding = new DeleteBuildingService(fakeBuildingsRepository)
  })

  it('Should be able to delete a building', async () => {
    const building = await fakeBuildingsRepository.create({
      slug: 'slug-example',
      name: 'Building example',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    const deleted = await deleteBuilding.execute({ id: building.id })

    expect(deleted).toBeTruthy()
  })

  it('Should not be able to delete a non existing building', async () => {
    await expect(
      deleteBuilding.execute({
        id: 'non-existing-building'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
