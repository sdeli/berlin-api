import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Sense } from './sense.entity';
import { LineValue } from 'src/libs/types';

@Entity()
export class SenseLine {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('jsonb')
  source: LineValue;

  @Column('jsonb')
  target: LineValue;

  @ManyToOne(() => Sense, (sense) => sense.lines)
  sense: Sense;

  @CreateDateColumn()
  updatedAt: Date;
}
