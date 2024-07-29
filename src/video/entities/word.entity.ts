import { WordSources } from 'src/libs/types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export interface WordErrors {
  downloadError?: any;
  deffenderError?: any;
}

export interface WordMeta {
  errors?: WordErrors;
  uploadError?: any;
}

export enum BannMessage {
  ToMuchHuman = 'to many human actors',
  OffTopic = 'not about the keyword',
  IdleFfmped = 'ffmpeg stays idle on Word',
  Garbage = 'garbage Word',
  NoMesg = 'no message',
}

@Entity()
export class Word {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('enum', { enum: WordSources })
  source: WordSources;

  @Column('varchar', { unique: true })
  originalUrl: string;

  @Column({ type: 'varchar', nullable: true })
  originalId: string | null;

  // @Column('enum', { enum: WordType })
  // type: WordType;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  title: string | null;

  @CreateDateColumn()
  discoveredAt: Date;

  @Column({ nullable: false, type: 'jsonb', default: {} })
  meta: WordMeta;
}
