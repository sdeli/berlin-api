import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { SenseLine } from '../../word/entities/sense-line.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class SenseList {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'bool', nullable: false, default: true })
  canDelete: string;

  @ManyToMany(() => SenseLine, (senseLine) => senseLine.senseLists, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  senseLines: SenseLine[];

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  belongsTo: User;

  @CreateDateColumn()
  updatedAt: Date;
}
