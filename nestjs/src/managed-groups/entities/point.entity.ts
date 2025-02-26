import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { GroupUser } from './group_user.entity'

@Entity('points')
export class Point {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => GroupUser, (groupUser) => groupUser.points)
  @JoinColumn({ name: 'group_user_id' })
  group_user: GroupUser

  @Column({ type: 'int', default: 0 })
  points: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  expiration_date: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
