import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { User } from '@/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

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
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
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
