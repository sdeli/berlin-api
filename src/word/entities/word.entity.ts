import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Sense } from './sense.entity';
import { WordSources } from 'src/libs/types';
import { User } from 'src/users/entities/user.entity';

export interface WordMeta {
  uploadError?: any;
}

@Entity()
export class Word {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('enum', { enum: WordSources, nullable: true })
  source: WordSources;

  @Column('varchar', { unique: true, nullable: true })
  originalUrl: string;

  @Column({ type: 'varchar', nullable: false })
  text: string;

  @Column({ nullable: false, type: 'jsonb', default: {} })
  meta: WordMeta;

  @OneToMany(() => Sense, (sense) => sense.word, {
    nullable: true,
    cascade: true,
  })
  senses: Sense[];

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  belongsTo: User;

  @CreateDateColumn()
  updatedAt: Date;
}
