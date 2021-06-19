import authentication from '@modules/admins/infra/http/middlewares/authentication'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import RockTypesController from '../controllers/RockTypesController'

const rockTypesRouter = Router()
const rockTypesControler = new RockTypesController()

rockTypesRouter.post(
  '/',
  authentication,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      references: Joi.array().items(Joi.string())
    }
  }),
  rockTypesControler.create
)

export default rockTypesRouter
