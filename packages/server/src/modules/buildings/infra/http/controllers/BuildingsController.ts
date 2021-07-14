import CreateBuildingService from '@modules/buildings/services/CreateBuildingService'
import DeleteBuildingService from '@modules/buildings/services/DeleteBuildingService'
import ListBuildingsService from '@modules/buildings/services/ListBuildingsService'
import ShowBuildingsService from '@modules/buildings/services/ShowBuildingService'
import UpdateBuildingService from '@modules/buildings/services/UpdateBuildingService'
import responseObjectDefault from '@shared/utils/response.utils'
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class BuildingsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, N } = request.query

    const listBuildings = container.resolve(ListBuildingsService)

    const [buildings, count] = await listBuildings.execute({
      page: Number(page),
      N: Number(N)
    })

    const responseObject = responseObjectDefault({
      data: classToClass(buildings),
      count
    })

    return response.json(responseObject)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id_or_slug } = request.params

    const showBuilding = container.resolve(ShowBuildingsService)

    const building = await showBuilding.execute({ id_or_slug })

    const responseObject = responseObjectDefault({
      data: classToClass(building)
    })

    return response.json(responseObject)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { slug, name, description, location, thumbnail, images, references } = request.body

    const createBuilding = container.resolve(CreateBuildingService)

    const building = await createBuilding.execute({
      slug,
      name,
      description,
      location,
      thumbnail,
      images,
      references,
      created_by: user_id
    })

    const responseObject = responseObjectDefault({
      data: classToClass(building)
    })

    return response.json(responseObject)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { slug, name, description, location, thumbnail, images, references } = request.body

    const updateBuilding = container.resolve(UpdateBuildingService)

    const building = await updateBuilding.execute({
      id,
      slug,
      name,
      description,
      location,
      thumbnail,
      images,
      references
    })

    const responseObject = responseObjectDefault({
      data: classToClass(building)
    })

    return response.json(responseObject)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteBuilding = container.resolve(DeleteBuildingService)

    await deleteBuilding.execute({ id })

    const responseObject = responseObjectDefault({
      data: null,
      http_status: 204
    })

    return response.json(responseObject)
  }
}
