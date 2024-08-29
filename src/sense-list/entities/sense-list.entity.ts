import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { SenseLine } from '../../word/entities/sense-line.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class SenseList {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToMany(() => SenseLine, (senseLine) => senseLine.senseLists, {
    cascade: true,
  })
  @JoinColumn()
  senseLines: SenseLine[];

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  belongsTo: User;

  @CreateDateColumn()
  updatedAt: Date;
}
