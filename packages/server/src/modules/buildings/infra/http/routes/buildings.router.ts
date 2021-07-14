import authentication from '@modules/admins/infra/http/middlewares/authentication'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import BuildingsController from '../controllers/BuildingsController'

const buildingsRouter = Router()
const buildingsController = new BuildingsController()

buildingsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      N: Joi.number()
    }
  }),
  buildingsController.index
)

buildingsRouter.get(
  '/:id_or_slug',
  celebrate({
    [Segments.PARAMS]: {
      id_or_slug: Joi.string().required()
    }
  }),
  buildingsController.show
)

buildingsRouter.post(
  '/',
  authentication,
  celebrate({
    [Segments.BODY]: {
      slug: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      location: Joi.string(),
      thumbnail: Joi.string(),
      images: Joi.array().items(Joi.string()),
      references: Joi.array().items(Joi.string())
    }
  }),
  buildingsController.create
)

buildingsRouter.put(
  '/:id',
  authentication,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      slug: Joi.string(),
      description: Joi.string(),
      location: Joi.string(),
      thumbnail: Joi.string(),
      images: Joi.array().items(Joi.string()),
      references: Joi.array().items(Joi.string())
    }
  }),
  buildingsController.update
)

buildingsRouter.delete(
  '/:id',
  authentication,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  buildingsController.delete
)

export default buildingsRouter
