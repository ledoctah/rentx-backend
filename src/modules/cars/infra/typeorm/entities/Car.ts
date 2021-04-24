import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Company from '@modules/companies/infra/typeorm/entities/Company';
import Fuel from '@modules/fuels/infra/typeorm/entities/Fuel';
import Transmission from '@modules/transmissions/infra/typeorm/entities/Transmission';
import CarPhoto from './CarPhoto';

@Entity('cars')
export default class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '64' })
  name: 'string';

  @Column({ type: 'integer' })
  top_speedKM: number;

  @Column()
  acceleration: string;

  @Column('integer')
  power: number;

  @Column({ length: '255' })
  about: string;

  @Column('integer')
  capacity: string;

  @Column({ type: 'varchar', length: '8' })
  daily_price: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @ManyToOne(() => Company, company => company.id, { lazy: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ type: 'uuid' })
  fuel_id: string;

  @ManyToOne(() => Fuel, fuel => fuel.id, { lazy: true })
  @JoinColumn({ name: 'fuel_id' })
  fuel: Fuel;

  @Column({ type: 'uuid' })
  transmission_id: string;

  @ManyToOne(() => Transmission, transmission => transmission.id, {
    lazy: true,
  })
  @JoinColumn({ name: 'transmission_id' })
  transmission: Transmission;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => CarPhoto, carPhoto => carPhoto.car)
  carPhotos: CarPhoto[];
}
