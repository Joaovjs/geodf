import AuthenticateAdminService from '@modules/admins/services/AuthenticateAdminService'
import responseObjectDefault from '@shared/utils/response.utils'
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class AdminsAuthController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateAdmin = container.resolve(AuthenticateAdminService)

    const { admin, token } = await authenticateAdmin.execute({
      email,
      password
    })

    const userWithToken = {
      ...classToClass(admin),
      key: token
    }

    const responseObject = responseObjectDefault({ data: userWithToken })

    return response.json(responseObject)
  }
}
