import CreateBuildingRockService from '@modules/buildings/services/CreateBuildingRockService'
import responseObjectDefault from '@shared/utils/response.utils'
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class BuildingsRocksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { rock_id, building_id, name, description, images, references } = request.body

    const createBuildingRock = container.resolve(CreateBuildingRockService)

    const buildingRock = await createBuildingRock.execute({
      rock_id,
      building_id,
      name,
      description,
      images,
      references,
      created_by: user_id
    })

    const responseObject = responseObjectDefault({
      data: classToClass(buildingRock)
    })

    return response.json(responseObject)
  }
}
