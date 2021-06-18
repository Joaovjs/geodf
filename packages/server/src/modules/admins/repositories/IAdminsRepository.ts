import { IPagination } from '@shared/interfaces/IPagination'
import ICreateAdminDTO from '../dtos/ICreateAdminDTO'
import Admin from '../infra/typeorm/entities/Admin'

export default interface IAdminsRepository {
  count: number
  getAll(pagination: IPagination): Promise<Admin[]>
  findById(admin_id: string): Promise<Admin | undefined>
  findByEmail(admin_email: string): Promise<Admin | undefined>
  create(admin: ICreateAdminDTO): Promise<Admin>
}
