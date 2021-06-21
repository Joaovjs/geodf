import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class ForeinKeyCreatedBy1624209976053 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'medias',
      new TableForeignKey({
        name: 'createdBy',
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'admins',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      'references',
      new TableForeignKey({
        name: 'createdBy',
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'admins',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )

    await queryRunner.createForeignKey(
      'rock_types',
      new TableForeignKey({
        name: 'createdBy',
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'admins',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rock_types', 'createdBy')
    await queryRunner.dropForeignKey('references', 'createdBy')
    await queryRunner.dropForeignKey('medias', 'createdBy')
  }
}
