import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ type: 'text', nullable: true })
  log: string;
}
