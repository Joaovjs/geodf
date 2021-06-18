import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { errors } from 'celebrate'
import AppError from '@shared/errors/AppError'
import uploadConfig from '@config/upload'
import responseObjectDefault from '@shared/utils/response.utils'
import rateLimiter from './middlewares/RateLimiter'
import routes from './routes'

import '@shared/infra/typeorm'
import '@shared/container'

const app = express()

app.use(rateLimiter)
app.use(cors())
app.use(express.json())
app.use('/file/media', express.static(uploadConfig.mediasFolder))
app.use(routes)
app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  const responseObject = responseObjectDefault<string>({
    status: 'error',
    data: 'Internal server error',
    http_status: 500,
    count: 0
  })

  if (err instanceof AppError) {
    responseObject.http_status = err.statusCode
    responseObject.data = err.message

    return response.status(err.statusCode).json(responseObject)
  }

  console.log(err)

  return response.status(500).json(responseObject)
})

app.listen(3333, () => {
  console.log('Server is running')
})
