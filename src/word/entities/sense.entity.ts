import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { SenseLine } from './sense-line.entity';
import { Word } from './word.entity';
import { LineValue } from 'src/libs/types';

@Entity()
export class Sense {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('jsonb')
  line: LineValue;

  @OneToMany(() => SenseLine, (senseLine) => senseLine.sense)
  lines: SenseLine[];

  @ManyToOne(() => Word, (word) => word.senses, { nullable: true })
  word: Word;

  @CreateDateColumn()
  updatedAt: Date;
}
