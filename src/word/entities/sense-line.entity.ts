import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Sense } from './sense.entity';
import { LineValue } from 'src/libs/types';
import { SenseList } from './sense-list.entity';

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

  @ManyToMany(() => SenseList, (senseList) => senseList.senseLines)
  senseLists: Sense;

  @CreateDateColumn()
  updatedAt: Date;
}
