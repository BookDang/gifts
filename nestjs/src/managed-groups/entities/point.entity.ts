import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '@/users/entities/user.entity'
import { Group } from '@/managed-groups/entities/group.entity'

@Entity('points')
export class Point {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Group, (group) => group.points, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group: Group

  @ManyToOne(() => User, (user) => user.points, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ type: 'int', default: 0 })
  points: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expiration_date: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
