import { hash } from 'bcryptjs'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class RegisterAdminDefault1623857093505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('admins').save({
      name: 'User admin',
      email: 'user@admin.com',
      password: await hash('123456', 8) // 123456 with bycript
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.getRepository('admins').delete(() => '')
  }
}
