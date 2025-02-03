import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '@/users/entities/user.entity'
import { GroupUser } from '@/groups/entities/group_user.entity'

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 50,
  })
  @Index()
  group_name: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string

  @Column({
    type: 'text',
    nullable: true,
  })
  avatar_url: string

  @ManyToOne(() => User, (user) => user.groups, { onDelete: 'CASCADE' })
  user: Partial<User>

  @OneToMany(() => GroupUser, (groupUser) => groupUser.group, { onDelete: 'CASCADE' })
  groupUsers: GroupUser[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
