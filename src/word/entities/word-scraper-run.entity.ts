import { WordSources } from 'src/libs/types';
import { Word } from './word.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class WordScraperRun {
  @PrimaryGeneratedColumn('uuid')
  ID: number;

  @CreateDateColumn()
  startedAt: Date;

  @Column({ type: 'date', nullable: true })
  finishedAt: string;

  @Column('enum', { enum: WordSources, nullable: false })
  plattform: WordSources;

  @Column({ type: 'boolean', nullable: false, default: false })
  isSuccesful: boolean;

  @Column({ type: 'date', nullable: false })
  heartBeat: string;

  @Column({ type: 'varchar', nullable: true })
  lastProcessedWord: string;

  @Column({ type: 'varchar', nullable: true })
  currentError: string;

  @OneToMany(() => Word, (word) => word)
  foundWords: Word[];
}
