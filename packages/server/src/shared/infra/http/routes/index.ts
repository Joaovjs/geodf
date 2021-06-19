import adminsRouter from '@modules/admins/infra/http/routes/admins.routes'
import authRouter from '@modules/admins/infra/http/routes/auth.routes'
import mediaRouter from '@modules/media/infra/http/routes/uploads.router'
import referencesRouter from '@modules/references/infra/http/routes/references.router'
import rockTypesRouter from '@modules/rocks/infra/http/routes/rockTypes.router'
import AppError from '@shared/errors/AppError'
import express from 'express'

const routes = express.Router()

routes.use('/auth', authRouter)
routes.use('/admins', adminsRouter)
routes.use('/media', mediaRouter)
routes.use('/references', referencesRouter)
routes.use('/rocks/types', rockTypesRouter)

routes.use('*', () => {
  throw new AppError('Endpoint not found', 404)
})

export default routes
