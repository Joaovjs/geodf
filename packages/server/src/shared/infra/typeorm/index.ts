import { createConnection } from 'typeorm'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '..', '.env') })

const dbOptions = {
  type: process.env.DB_TYPE as 'postgres' | 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

createConnection({
  ...dbOptions,
  entities: [
    path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'modules',
      '**',
      'infra',
      'typeorm',
      'entities',
      '*.ts'
    )
  ],
  migrations: [
    path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'modules',
      '**',
      'infra',
      'typeorm',
      'migrations',
      '*.ts'
    )
  ],
  cli: {
    migrationsDir: path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'modules',
      '**',
      'infra',
      'typeorm',
      'migrations',
      '*.ts'
    )
  }
})
