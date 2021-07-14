import AppError from '@shared/errors/AppError'
import FakeBuildingsRepository from '../repositories/fakes/FakeBuildingsRepository'
import ShowBuildingsService from './ShowBuildingService'

let showBuilding: ShowBuildingsService
let fakeBuildingsRepository: FakeBuildingsRepository

describe('ShowBuilding', () => {
  beforeEach(async () => {
    fakeBuildingsRepository = new FakeBuildingsRepository()
    showBuilding = new ShowBuildingsService(fakeBuildingsRepository)
  })

  it('Should be able to show a building', async () => {
    const { id } = await fakeBuildingsRepository.create({
      slug: 'slug-example',
      name: 'Building example',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    const building = await showBuilding.execute({ id_or_slug: id })

    expect(building).toHaveProperty('id')
    expect(building?.name).toBe('Building example')
  })

  it('Should not be able to show a non existing building', async () => {
    await expect(showBuilding.execute({ id_or_slug: 'non-existing-building' })).rejects.toBeInstanceOf(AppError)
  })
})
