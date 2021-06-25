import authentication from '@modules/admins/infra/http/middlewares/authentication'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import RocksController from '../controllers/RocksController'

const rocksRouter = Router()
const rockControler = new RocksController()

rocksRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      N: Joi.number()
    }
  }),
  rockControler.index
)

rocksRouter.post(
  '/',
  authentication,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.string().uuid().required(),
      locations: Joi.string(),
      thumbnail: Joi.string(),
      images: Joi.array().items(Joi.string()),
      references: Joi.array().items(Joi.string())
    }
  }),
  rockControler.create
)

rocksRouter.delete(
  '/:id',
  authentication,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  rockControler.delete
)

export default rocksRouter
