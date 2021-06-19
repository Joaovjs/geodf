import CreateReferenceService from '@modules/references/services/CreateReference'
import responseObjectDefault from '@shared/utils/response.utils'
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class ReferencesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { reference_text, link } = request.body

    const createReference = container.resolve(CreateReferenceService)

    const reference = await createReference.execute({
      reference_text,
      link,
      created_by: user_id
    })

    const responseObject = responseObjectDefault({
      data: classToClass(reference)
    })

    return response.json(responseObject)
  }
}
