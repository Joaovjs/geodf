import path from 'path'
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')
const mediasFolder = path.resolve(__dirname, '..', '..', 'tmp', 'media')

interface IUploadConfig {
  driver: 's3' | 'disk'
  tmpFolder: string
  mediasFolder: string
  multer: { storage: StorageEngine }
  config: {
    aws: {
      bucket: string
    }
  }
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  mediasFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`
        return callback(null, fileName)
      }
    })
  },
  config: {
    aws: {
      bucket: process.env.AWS_BUCKET
    }
  }
} as IUploadConfig
