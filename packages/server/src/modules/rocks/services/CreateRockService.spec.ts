import FakeRocksRepository from '../repositories/fakes/FakeRocksRepository'
import CreateRockService from './CreateRockService'

let createRock: CreateRockService
let fakeRocksRepository: FakeRocksRepository

describe('ListRocks', () => {
  beforeEach(async () => {
    fakeRocksRepository = new FakeRocksRepository()
    createRock = new CreateRockService(fakeRocksRepository)
  })

  it('Should be able to create a rock', async () => {
    const rock = await createRock.execute({
      name: 'Rock example',
      description: 'Lorem ipsum',
      type: 'type-of-rock',
      created_by: 'jhon-doe-id'
    })

    expect(rock).toHaveProperty('id')
    expect(rock.name).toBe('Rock example')
  })
})
