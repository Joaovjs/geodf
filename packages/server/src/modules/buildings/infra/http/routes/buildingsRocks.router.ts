import authentication from '@modules/admins/infra/http/middlewares/authentication'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import BuildingsRocksController from '../controllers/BuildingsRocksController'

const buildingsRocksRouter = Router()
const buildingsRocksController = new BuildingsRocksController()

buildingsRocksRouter.post(
  '/',
  authentication,
  celebrate({
    [Segments.BODY]: {
      rock_id: Joi.string().uuid().required(),
      building_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      images: Joi.array().items(Joi.string()),
      references: Joi.array().items(Joi.string())
    }
  }),
  buildingsRocksController.create
)

export default buildingsRocksRouter
