import CreateRockService from '@modules/rocks/services/CreateRockService'
import DeleteRockService from '@modules/rocks/services/DeleteRockService'
import ListRocksService from '@modules/rocks/services/ListRocksService'
import UpdateRockService from '@modules/rocks/services/UpdateRocksService'
import responseObjectDefault from '@shared/utils/response.utils'
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class RocksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, N } = request.query

    const listRocks = container.resolve(ListRocksService)

    const [rocks, count] = await listRocks.execute({
      page: Number(page),
      N: Number(N)
    })

    const responseObject = responseObjectDefault({
      data: classToClass(rocks),
      count
    })

    return response.json(responseObject)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, description, type, locations, thumbnail, images, references } = request.body

    const createRock = container.resolve(CreateRockService)

    const rock = await createRock.execute({
      name,
      description,
      type,
      locations,
      thumbnail,
      images,
      references,
      created_by: user_id
    })

    const responseObject = responseObjectDefault({
      data: classToClass(rock)
    })

    return response.json(responseObject)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, description, type, locations, thumbnail, images, references } = request.body

    const updateRock = container.resolve(UpdateRockService)

    const rock = await updateRock.execute({
      id,
      name,
      description,
      type,
      locations,
      thumbnail,
      images,
      references
    })

    const responseObject = responseObjectDefault({
      data: classToClass(rock)
    })

    return response.json(responseObject)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteRock = container.resolve(DeleteRockService)

    await deleteRock.execute({ id })

    const responseObject = responseObjectDefault({
      data: null,
      http_status: 204
    })

    return response.json(responseObject)
  }
}
