import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import AdminsAuthController from '../controllers/AdminsAuthController'

const authRouter = Router()
const adminsAuthController = new AdminsAuthController()

authRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  adminsAuthController.create
)

export default authRouter
