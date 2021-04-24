import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Car from './Car';

@Entity('car_photos')
export default class CarPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  photo_url: string;

  @Column()
  car_id: string;

  @ManyToOne(() => Car, car => car.id)
  @JoinColumn({ name: 'car_id' })
  car: Car;
}
