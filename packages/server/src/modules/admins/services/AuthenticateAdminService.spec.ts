import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeAdminsRepository from '../repositories/fakes/FakeAdminsRepository'
import AuthenticateAdminService from './AuthenticateAdminService'

let fakeHashProvider: FakeHashProvider
let fakeAdminRepository: FakeAdminsRepository
let authenticateAdmin: AuthenticateAdminService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeAdminRepository = new FakeAdminsRepository()
    fakeHashProvider = new FakeHashProvider()

    authenticateAdmin = new AuthenticateAdminService(
      fakeAdminRepository,
      fakeHashProvider
    )
  })

  it('should be able to authenticate', async () => {
    await fakeAdminRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@mail.com',
      password: await fakeHashProvider.generateHash('123456')
    })

    const response = await authenticateAdmin.execute({
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateAdmin.execute({
        email: 'jhon@test.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await fakeAdminRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@mail.com',
      password: await fakeHashProvider.generateHash('123456')
    })

    await expect(
      authenticateAdmin.execute({
        email: 'jhondoe@mail.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
