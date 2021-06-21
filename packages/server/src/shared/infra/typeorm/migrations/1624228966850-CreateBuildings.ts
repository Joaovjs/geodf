import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateBuildings1624228966850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'buildings',
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
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'location',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'images',
            type: 'varchar[]',
            isNullable: true
          },
          {
            name: 'references',
            type: 'uuid[]',
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
        ],
        foreignKeys: [
          {
            name: 'createdBy',
            columnNames: ['created_by'],
            referencedColumnNames: ['id'],
            referencedTableName: 'admins',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          },
          {
            name: 'thumbNail',
            columnNames: ['thumbnail'],
            referencedColumnNames: ['slug'],
            referencedTableName: 'medias',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('buildings')
  }
}
