import adminsRouter from '@modules/admins/infra/http/routes/admins.routes'
import authRouter from '@modules/admins/infra/http/routes/auth.routes'
import AppError from '@shared/errors/AppError'
import express from 'express'

const routes = express.Router()

routes.use('/auth', authRouter)
routes.use('/admins', adminsRouter)

routes.use('*', () => {
  throw new AppError('Endpoint not found', 404)
})

export default routes
