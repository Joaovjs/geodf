import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class UpdateBuildingRockTable1624797730542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'buildings_rocks',
      new TableForeignKey({
        name: 'typeOfRock',
        columnNames: ['rock'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rocks',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )

    await queryRunner.changeColumn(
      'buildings_rocks',
      'rock',
      new TableColumn({
        name: 'rock_id',
        type: 'uuid',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'buildings_rocks',
      new TableForeignKey({
        name: 'typeOfRock',
        columnNames: ['rock_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rocks',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('buildings_rocks', 'typeOfRock')

    await queryRunner.changeColumn(
      'buildings_rocks',
      'rock_id',
      new TableColumn({
        name: 'rock',
        type: 'uuid',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'buildings_rocks',
      new TableForeignKey({
        name: 'typeOfRock',
        columnNames: ['rock'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rocks',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }
}
