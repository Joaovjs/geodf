import CreateAdminService from '@modules/admins/services/CreateAdminService'
import ListAdminService from '@modules/admins/services/ListAdminService'
import responseObjectDefault from '@shared/utils/response.utils'
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class AdminsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, N } = request.query

    const listAdmin = container.resolve(ListAdminService)

    const [admins, count] = await listAdmin.execute({
      page: Number(page),
      N: Number(N)
    })

    const responseObject = responseObjectDefault({
      data: classToClass(admins),
      count
    })

    return response.json(responseObject)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createAdmin = container.resolve(CreateAdminService)

    const admin = await createAdmin.execute({
      name,
      email,
      password
    })

    const responseObject = responseObjectDefault({ data: classToClass(admin) })

    return response.json(responseObject)
  }
}
