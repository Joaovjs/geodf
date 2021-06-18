import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import AppError from '@shared/errors/AppError'
import FakeMediasRepository from '../repositories/fakes/FakeMediasRepository'
import UploadFileService from './UploadFileService'

let fakeStorageProvider: FakeStorageProvider
let fakeMediasRepository: FakeMediasRepository
let uploadFile: UploadFileService

describe('UploadFile', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider()
    fakeMediasRepository = new FakeMediasRepository()

    uploadFile = new UploadFileService(
      fakeStorageProvider,
      fakeMediasRepository
    )
  })

  it('should be able to upload a file', async () => {
    const file = await uploadFile.execute({
      slug: 'file.jpg',
      created_by: 'jhon-doe-id'
    })

    expect(file).toHaveProperty('id')
    expect(file.slug).toBe('file.jpg')
  })

  it('should not be able to upload a file with a name already in use', async () => {
    await uploadFile.execute({
      slug: 'file.jpg',
      created_by: 'jhon-doe-id'
    })

    await expect(
      uploadFile.execute({
        slug: 'file.jpg',
        created_by: 'jhon-doe-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
