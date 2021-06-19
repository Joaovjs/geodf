import authentication from '@modules/admins/infra/http/middlewares/authentication'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import ReferencesController from '../controllers/ReferencesController'

const referencesRouter = Router()
const referencesController = new ReferencesController()

referencesRouter.post(
  '/',
  authentication,
  celebrate({
    [Segments.BODY]: {
      reference_text: Joi.string().required(),
      link: Joi.string()
    }
  }),
  referencesController.create
)

export default referencesRouter
