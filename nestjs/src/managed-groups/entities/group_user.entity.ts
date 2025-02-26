import { Group } from '@/managed-groups/entities/group.entity'
import { Point } from '@/managed-groups/entities/point.entity'
import { User } from '@/users/entities/user.entity'
import { USER_ROLES_ENUM, USER_STATUSES_ENUM } from '@/utils/enums/user.enum'
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('group_users')
export class GroupUser {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.groupUsers)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Group, (group) => group.groupUsers)
  @JoinColumn({ name: 'group_id' })
  group: Group

  @OneToMany(() => Point, (point) => point.group_user, { onDelete: 'CASCADE' })
  points: Point[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joined_at: Date

  @Column({
    type: 'enum',
    enum: USER_ROLES_ENUM,
    default: USER_ROLES_ENUM.MEMBER,
  })
  role: USER_ROLES_ENUM

  @Column({
    type: 'enum',
    enum: USER_STATUSES_ENUM,
    default: USER_STATUSES_ENUM.ACTIVE,
  })
  status: USER_STATUSES_ENUM

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
