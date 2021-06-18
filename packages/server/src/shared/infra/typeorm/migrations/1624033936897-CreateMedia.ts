import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMedia1624033936897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medias',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'alt',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'status',
            type: 'boolean',
            default: true
          },
          {
            name: 'created_by',
            type: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('medias')
  }
}
