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
import { Group } from '@/groups/entities/group.entity'
import { USER_ROLES, USER_STATUSES } from '@/utils/constants/user.const'

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
    enum: USER_ROLES,
    default: USER_ROLES[0],
  })
  role: (typeof USER_ROLES)[number]

  @Column({
    type: 'enum',
    enum: USER_STATUSES,
    default: USER_STATUSES[0],
  })
  status: (typeof USER_STATUSES)[number]

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
