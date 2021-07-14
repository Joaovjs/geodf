import FakeBuildingsRepository from '../repositories/fakes/FakeBuildingsRepository'
import ListBuildingsService from './ListBuildingsService'

let listBuildings: ListBuildingsService
let fakeBuildingsRepository: FakeBuildingsRepository

describe('ListBuildings', () => {
  beforeEach(async () => {
    fakeBuildingsRepository = new FakeBuildingsRepository()
    listBuildings = new ListBuildingsService(fakeBuildingsRepository)
  })

  it('Should be able to list buildings', async () => {
    await fakeBuildingsRepository.create({
      slug: 'slug-example',
      name: 'Building example',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    await fakeBuildingsRepository.create({
      slug: 'slug-example-two',
      name: 'Building example',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    const [buildings] = await listBuildings.execute()

    expect(buildings).toHaveLength(2)
  })

  it('Should be able to list buildings passing paginate', async () => {
    await fakeBuildingsRepository.create({
      slug: 'slug-example',
      name: 'Building example',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    await fakeBuildingsRepository.create({
      slug: 'slug-example-two',
      name: 'Building example',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    const [buildings] = await listBuildings.execute({ page: 1, N: 2 })

    expect(buildings).toHaveLength(2)
  })
})
