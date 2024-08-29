import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SenseLine } from './sense-line.entity';
import { Word } from './word.entity';
import { LineValue } from 'src/libs/types';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Sense {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('jsonb')
  line: LineValue;

  @OneToMany(() => SenseLine, (senseLine) => senseLine.senseLists)
  lines: SenseLine[];

  @ManyToOne(() => Word, (word) => word.senses, { nullable: true })
  word: Word;

  @CreateDateColumn()
  updatedAt: Date;
}
