import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import AdminsController from '../controllers/AdminsController'
import authentication from '../middlewares/authentication'

const adminsRouter = Router()
const adminsController = new AdminsController()

adminsRouter.get(
  '/',
  authentication,
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      N: Joi.number()
    }
  }),
  adminsController.index
)

adminsRouter.post(
  '/',
  authentication,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  adminsController.create
)

export default adminsRouter
