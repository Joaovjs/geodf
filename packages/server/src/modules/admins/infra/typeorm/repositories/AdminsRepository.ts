import ICreateAdminDTO from '@modules/admins/dtos/ICreateAdminDTO'
import IAdminsRepository from '@modules/admins/repositories/IAdminsRepository'
import { IPagination } from '@shared/interfaces/IPagination'
import { EntityRepository, getRepository, Repository } from 'typeorm'
import Admin from '../entities/Admin'

@EntityRepository(Admin)
export default class AdminsRepository implements IAdminsRepository {
  private ormRepository: Repository<Admin>
  public count: number

  constructor() {
    this.ormRepository = getRepository(Admin)
  }

  public async getAll({ page, N }: IPagination): Promise<Admin[]> {
    const [admins, count] = await this.ormRepository.findAndCount({
      take: N,
      skip: page
    })

    this.count = count
    return admins
  }

  public async findById(admin_id: string): Promise<Admin | undefined> {
    const admin = await this.ormRepository.findOne(admin_id)

    return admin
  }

  public async findByEmail(admin_email: string): Promise<Admin | undefined> {
    const admin = await this.ormRepository.findOne({ email: admin_email })

    return admin
  }

  public async create(admin_data: ICreateAdminDTO): Promise<Admin> {
    const admin = this.ormRepository.create(admin_data)

    await this.ormRepository.save(admin)

    return admin
  }
}
