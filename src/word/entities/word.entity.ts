import { WordSources } from 'src/libs/types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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
