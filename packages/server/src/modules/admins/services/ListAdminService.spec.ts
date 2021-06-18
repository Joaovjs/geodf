import FakeAdminsRepository from '../repositories/fakes/FakeAdminsRepository'
import ListAdminService from './ListAdminService'

let listAdmin: ListAdminService
let fakeAdminsRepository: FakeAdminsRepository

describe('CreateAdmin', () => {
  beforeEach(async () => {
    fakeAdminsRepository = new FakeAdminsRepository()
    listAdmin = new ListAdminService(fakeAdminsRepository)
  })

  it('Should be able to list admins', async () => {
    await fakeAdminsRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    await fakeAdminsRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe1@mail.com',
      password: '123456'
    })

    const [admins] = await listAdmin.execute()

    expect(admins).toHaveLength(2)
  })

  it('Should be able to list admins passing paginate', async () => {
    await fakeAdminsRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    await fakeAdminsRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe1@mail.com',
      password: '123456'
    })

    const [admins] = await listAdmin.execute({ page: 1, N: 2 })

    expect(admins).toHaveLength(2)
  })
})
