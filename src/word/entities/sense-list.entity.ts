import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { Sense } from './sense.entity';
import { User } from 'src/users/entities/user.entity';
import { SenseLine } from './sense-line.entity';

export interface WordMeta {
  uploadError?: any;
}

@Entity()
export class SenseList {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToMany(() => SenseLine, (senseLine) => senseLine.senseLists)
  senseLines: SenseLine[];

  @OneToOne(() => User)
  @JoinColumn()
  belongsTo: User;

  @CreateDateColumn()
  updatedAt: Date;
}
