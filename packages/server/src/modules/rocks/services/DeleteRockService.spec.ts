import AppError from '@shared/errors/AppError'
import FakeRocksRepository from '../repositories/fakes/FakeRocksRepository'
import DeleteRockService from './DeleteRockService'

let deleteRock: DeleteRockService
let fakeRocksRepository: FakeRocksRepository

describe('DeleteRock', () => {
  beforeEach(async () => {
    fakeRocksRepository = new FakeRocksRepository()
    deleteRock = new DeleteRockService(fakeRocksRepository)
  })

  it('Should be able to delete a rock', async () => {
    const rock = await fakeRocksRepository.create({
      name: 'Rock example',
      description: 'Lorem ipsum',
      type: 'type-of-rock',
      created_by: 'jhon-doe-id'
    })

    const deleted = await deleteRock.execute({ id: rock.id })

    expect(deleted).toBeTruthy()
  })

  it('Should not be able to delete a non existing rock', async () => {
    await expect(
      deleteRock.execute({
        id: 'non-existing-rock'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
