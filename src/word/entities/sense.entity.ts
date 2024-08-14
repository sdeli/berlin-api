import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { SenseLine } from './sense-pair.entity';
import { Word } from './word.entity';

export interface WordMeta {
  uploadError?: any;
}

@Entity()
export class Sense {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('text')
  html: string;

  @Column('varchar')
  text: string;

  @OneToMany(() => SenseLine, senseLine => senseLine.sense)
  lines: SenseLine[];

  @ManyToOne(() => Word, word => word.senses)
  word: Word;

  @CreateDateColumn()
  updatedAt: Date;
}
