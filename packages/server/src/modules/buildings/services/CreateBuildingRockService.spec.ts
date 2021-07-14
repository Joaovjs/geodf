import FakeRocksRepository from '@modules/rocks/repositories/fakes/FakeRocksRepository'
import AppError from '@shared/errors/AppError'
import FakeBuildingsRepository from '../repositories/fakes/FakeBuildingsRepository'
import FakeBuildingsRocksRepository from '../repositories/fakes/FakeBuildingsRocksRepository'
import CreateBuildingRockService from './CreateBuildingRockService'

let createBuildingRock: CreateBuildingRockService
let fakeBuildingsRocksRepository: FakeBuildingsRocksRepository
let fakeBuildingsRepository: FakeBuildingsRepository
let fakeRocksRepository: FakeRocksRepository

describe('CreateBuildingRock', () => {
  beforeEach(async () => {
    fakeBuildingsRocksRepository = new FakeBuildingsRocksRepository()
    fakeBuildingsRepository = new FakeBuildingsRepository()
    fakeRocksRepository = new FakeRocksRepository()

    createBuildingRock = new CreateBuildingRockService(
      fakeBuildingsRocksRepository,
      fakeBuildingsRepository,
      fakeRocksRepository
    )
  })

  it('Should be able to create a building rock', async () => {
    const building = await fakeBuildingsRepository.create({
      slug: 'slug-example',
      name: 'Building example',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    const rock = await fakeRocksRepository.create({
      name: 'Building example',
      description: 'Lorem ipsum',
      type: 'rock-type',
      created_by: 'jhon-doe-id'
    })

    const buildingRock = await createBuildingRock.execute({
      rock_id: rock.id,
      building_id: building.id,
      name: 'Building rock example',
      description: 'Lorem ipsum',
      created_by: 'jhon-doe-id'
    })

    expect(buildingRock).toHaveProperty('id')
    expect(buildingRock.name).toBe('Building rock example')
  })

  it('Should not be able to create a building rock whit an invalid rock', async () => {
    await expect(
      createBuildingRock.execute({
        rock_id: 'invalid-rock-id',
        building_id: 'invalid building-id',
        name: 'Building rock example',
        description: 'Lorem ipsum',
        created_by: 'jhon-doe-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a building rock whit an invalid building', async () => {
    const rock = await fakeRocksRepository.create({
      name: 'Building example',
      description: 'Lorem ipsum',
      type: 'rock-type',
      created_by: 'jhon-doe-id'
    })

    await expect(
      createBuildingRock.execute({
        rock_id: rock.id,
        building_id: 'invalid building-id',
        name: 'Building rock example',
        description: 'Lorem ipsum',
        created_by: 'jhon-doe-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
