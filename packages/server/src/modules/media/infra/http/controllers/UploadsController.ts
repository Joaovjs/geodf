import UploadFileService from '@modules/media/services/UploadFileService'
import responseObjectDefault from '@shared/utils/response.utils'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class UploadsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { filename } = request.file as Express.Multer.File
    const { title, description, alt } = request.body

    const uploadFile = container.resolve(UploadFileService)

    const fileName = await uploadFile.execute({
      slug: filename,
      title,
      description,
      alt,
      created_by: user_id
    })

    const responseObject = responseObjectDefault({ data: fileName })

    return response.json(responseObject)
  }
}
