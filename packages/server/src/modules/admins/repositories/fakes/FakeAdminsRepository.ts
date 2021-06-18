import ICreateAdminDTO from '@modules/admins/dtos/ICreateAdminDTO'
import { IPagination } from '@shared/interfaces/IPagination'
import { uuid } from 'uuidv4'
import Admin from '../../infra/typeorm/entities/Admin'
import IAdminsRepository from '../IAdminsRepository'

export default class FakeAdminsRepository implements IAdminsRepository {
  admins: Admin[] = []
  count: number

  public async getAll(_: IPagination): Promise<Admin[]> {
    this.count = this.admins.length
    return this.admins
  }

  public async findById(admin_id: string): Promise<Admin | undefined> {
    const admin = this.admins.find(findAdmin => findAdmin.id === admin_id)

    return admin
  }

  public async findByEmail(admin_email: string): Promise<Admin | undefined> {
    const admin = this.admins.find(findAdmin => findAdmin.email === admin_email)

    return admin
  }

  public async create(admin_data: ICreateAdminDTO): Promise<Admin> {
    const admin = new Admin()

    Object.assign(admin, { id: uuid(), ...admin_data })

    this.admins.push(admin)

    return admin
  }
}
