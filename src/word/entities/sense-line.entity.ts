import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Sense } from './sense.entity';
import { LineValue } from 'src/libs/types';
import { SenseList } from '../../sense-list/entities/sense-list.entity';

@Entity()
export class SenseLine {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('jsonb')
  source: LineValue;

  @Column('jsonb')
  target: LineValue;

  @ManyToOne(() => Sense, (sense) => sense.lines, { onDelete: 'CASCADE' })
  @JoinColumn()
  sense: Sense;

  @ManyToMany(() => SenseList, (senseList) => senseList.senseLines, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  senseLists: SenseList[];

  @CreateDateColumn()
  updatedAt: Date;
}
