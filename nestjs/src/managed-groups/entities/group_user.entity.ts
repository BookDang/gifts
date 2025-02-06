import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { User } from '@/users/entities/user.entity'
import { Group } from '@/managed-groups/entities/group.entity'
import { USER_ROLES_ENUM, USER_STATUSES_ENUM } from '@/utils/enums/user.enum'

@Entity()
export class GroupUser {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.groupUsers)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Group, (group) => group.groupUsers)
  @JoinColumn({ name: 'group_id' })
  group: Group

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date

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
