import { inject, injectable } from 'tsyringe'
import IAdminsRepository from '../repositories/IAdminsRepository'
import Admin from '../infra/typeorm/entities/Admin'
import { IPagination } from '@shared/interfaces/IPagination'

@injectable()
export default class ListAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminRepository: IAdminsRepository
  ) {}

  public async execute(pagination?: IPagination): Promise<[Admin[], number]> {
    let count = 0

    const page = pagination?.page || 0
    const N = pagination?.N || 10

    const admins = await this.adminRepository.getAll({
      page: page > 0 ? (page - 1) * N : 0,
      N
    })

    count = this.adminRepository.count

    return [admins, count]
  }
}
