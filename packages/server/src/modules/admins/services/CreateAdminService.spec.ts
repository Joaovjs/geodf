import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeAdminsRepository from '../repositories/fakes/FakeAdminsRepository'
import CreateAdminService from './CreateAdminService'

let createAdmin: CreateAdminService
let fakeHashProvider: FakeHashProvider
let fakeAdminsRepository: FakeAdminsRepository

describe('CreateAdmin', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider()
    fakeAdminsRepository = new FakeAdminsRepository()
    createAdmin = new CreateAdminService(fakeAdminsRepository, fakeHashProvider)
  })

  it('Should be able to create a admin', async () => {
    const admin = await createAdmin.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    expect(admin).toHaveProperty('id')
    expect(admin.name).toBe('Jhon Doe')
  })

  it('Should not be able to create a admin with already used email', async () => {
    await createAdmin.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    await expect(
      createAdmin.execute({
        name: 'Jhon Doe',
        email: 'jhondoe@mail.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
