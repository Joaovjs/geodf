import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import UploadsController from '../controllers/UploadsController'
import authentication from '@modules/admins/infra/http/middlewares/authentication'

const mediaRouter = Router()
const upload = multer(uploadConfig.multer)
const uploadsController = new UploadsController()

mediaRouter.post(
  '/upload',
  authentication,
  upload.single('file'),
  uploadsController.create
)

export default mediaRouter
