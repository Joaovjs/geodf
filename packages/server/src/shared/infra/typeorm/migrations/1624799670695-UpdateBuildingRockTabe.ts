import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class UpdateBuildingRockTabe1624799670695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'buildings_rocks',
      new TableForeignKey({
        name: 'inBuilding',
        columnNames: ['building'],
        referencedColumnNames: ['id'],
        referencedTableName: 'buildings',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )

    await queryRunner.changeColumn(
      'buildings_rocks',
      'building',
      new TableColumn({
        name: 'building_id',
        type: 'uuid'
      })
    )

    await queryRunner.createForeignKey(
      'buildings_rocks',
      new TableForeignKey({
        name: 'inBuilding',
        columnNames: ['building_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'buildings',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('buildings_rocks', 'inBuilding')

    await queryRunner.changeColumn(
      'buildings_rocks',
      'building_id',
      new TableColumn({
        name: 'building',
        type: 'uuid',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'buildings_rocks',
      new TableForeignKey({
        name: 'inBuilding',
        columnNames: ['building'],
        referencedColumnNames: ['id'],
        referencedTableName: 'buildings',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }
}
