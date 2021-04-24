import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCarsTable1619294273133
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '64',
          },
          {
            name: 'top_speedKM',
            type: 'integer',
          },
          {
            name: 'acceleration',
            type: 'varchar',
            length: '8',
          },
          {
            name: 'power',
            type: 'integer',
          },
          {
            name: 'about',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'capacity',
            type: 'integer',
          },
          {
            name: 'daily_price',
            type: 'varchar',
            length: '8',
          },
          {
            name: 'company_id',
            type: 'uuid',
          },
          {
            name: 'fuel_id',
            type: 'uuid',
          },
          {
            name: 'transmission_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'CarCompany',
            columnNames: ['company_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'companies',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'CarFuel',
            columnNames: ['fuel_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'fuels',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'CarTransmission',
            columnNames: ['transmission_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'transmissions',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'car_photos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'photo_url',
            type: 'varchar',
          },
          {
            name: 'car_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'CarPhoto',
            columnNames: ['car_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cars',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('car_photos');
    await queryRunner.dropTable('cars');
  }
}
