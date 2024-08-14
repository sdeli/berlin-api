import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Sense } from './sense.entity';
import { WordSources } from 'src/libs/types';

export interface WordMeta {
  uploadError?: any;
}

@Entity()
export class Word {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('enum', { enum: WordSources })
  source: WordSources;

  @Column('varchar', { unique: true })
  originalUrl: string;

  @Column({ type: 'varchar', nullable: false })
  text: string;

  @Column({ nullable: false, type: 'jsonb', default: {} })
  meta: WordMeta;

  @OneToMany(() => Sense, sense => sense)
  senses: Sense;

  @CreateDateColumn()
  updatedAt: Date;
}
