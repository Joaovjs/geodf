import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateBuildingsRocks1624230187991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'buildings_rocks',
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
            name: 'building',
            type: 'uuid'
          },
          {
            name: 'rock',
            type: 'uuid',
            isNullable: true
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
            name: 'typeOfRock',
            columnNames: ['rock'],
            referencedColumnNames: ['id'],
            referencedTableName: 'rocks',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          },
          {
            name: 'inBuilding',
            columnNames: ['building'],
            referencedColumnNames: ['id'],
            referencedTableName: 'buildings',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('buildings_rocks')
  }
}
