import AppError from '@shared/errors/AppError'
import FakeRocksRepository from '../repositories/fakes/FakeRocksRepository'
import UpdateRockService from './UpdateRocksService'

let updateRock: UpdateRockService
let fakeRocksRepository: FakeRocksRepository

describe('ListRocks', () => {
  beforeEach(async () => {
    fakeRocksRepository = new FakeRocksRepository()
    updateRock = new UpdateRockService(fakeRocksRepository)
  })

  it('Should be able to update a rock', async () => {
    const rock = await fakeRocksRepository.create({
      name: 'Rock example',
      description: 'Lorem ipsum',
      type: 'type-of-rock',
      created_by: 'jhon-doe-id'
    })

    const newRock = await updateRock.execute({
      id: rock.id,
      name: 'Rock example edited'
    })

    expect(newRock.name).toBe('Rock example edited')
  })

  it('Should not be able to update a non existing rock', async () => {
    await expect(
      updateRock.execute({
        id: 'non-existing-rock',
        name: 'Rock example edited'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
