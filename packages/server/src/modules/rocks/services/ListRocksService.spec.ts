import FakeRocksRepository from '../repositories/fakes/FakeRocksRepository'
import ListRocksService from './ListRocksService'

let listRocks: ListRocksService
let fakeRocksRepository: FakeRocksRepository

describe('ListRocks', () => {
  beforeEach(async () => {
    fakeRocksRepository = new FakeRocksRepository()
    listRocks = new ListRocksService(fakeRocksRepository)
  })

  it('Should be able to list rocks', async () => {
    await fakeRocksRepository.create({
      name: 'Rock example',
      description: 'Lorem ipsum',
      type: 'type-of-rock',
      created_by: 'jhon-doe-id'
    })

    await fakeRocksRepository.create({
      name: 'Rock example 2',
      description: 'Lorem ipsum',
      type: 'type-of-rock',
      created_by: 'jhon-doe-id'
    })

    const [rocks] = await listRocks.execute()

    expect(rocks).toHaveLength(2)
  })

  it('Should be able to list admins passing paginate', async () => {
    await fakeRocksRepository.create({
      name: 'Rock example',
      description: 'Lorem ipsum',
      type: 'type-of-rock',
      created_by: 'jhon-doe-id'
    })

    await fakeRocksRepository.create({
      name: 'Rock example 2',
      description: 'Lorem ipsum',
      type: 'type-of-rock',
      created_by: 'jhon-doe-id'
    })

    const [rocks] = await listRocks.execute({ page: 1, N: 2 })

    expect(rocks).toHaveLength(2)
  })
})
