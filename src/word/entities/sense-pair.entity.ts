import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Sense } from './sense.entity';

interface LineValue {
  html: string;
  text: string;
}

@Entity()
export class SenseLine {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('jsonb')
  source: LineValue;

  @Column('jsonb')
  target: LineValue;

  @ManyToOne(() => Sense, sense => sense.lines)
  sense: Sense;

  @CreateDateColumn()
  updatedAt: Date;
}
