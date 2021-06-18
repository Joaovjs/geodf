import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IAdminsRepository from '../repositories/IAdminsRepository'
import Admin from '../infra/typeorm/entities/Admin'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
export default class CreateAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminRepository: IAdminsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<Admin> {
    const findAdminWithSameEmail = await this.adminRepository.findByEmail(email)

    if (findAdminWithSameEmail) {
      throw new AppError('There is already a registered user with this email.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const admin = await this.adminRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return admin
  }
}
