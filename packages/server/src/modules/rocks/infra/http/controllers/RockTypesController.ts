import CreateRockTypeService from '@modules/rocks/services/CreateRockTypeService'
import responseObjectDefault from '@shared/utils/response.utils'
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class RockTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, description, references } = request.body

    const createRockType = container.resolve(CreateRockTypeService)

    const rockType = await createRockType.execute({
      name,
      description,
      references,
      created_by: user_id
    })

    const responseObject = responseObjectDefault({
      data: classToClass(rockType)
    })

    return response.json(responseObject)
  }
}
