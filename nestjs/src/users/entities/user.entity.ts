import { Group } from '@/managed-groups/entities/group.entity'
import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { GENDER } from '@/utils/constants/user.const'
import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Index({ unique: true })
  username: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Index()
  fullname: string

  @Column({
    type: 'enum',
    enum: GENDER,
    default: GENDER[0],
  })
  gender: (typeof GENDER)[number]

  @Column({
    type: 'date',
  })
  birthdate: Date

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Index({ unique: true })
  email: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Exclude()
  password: string

  @OneToMany(() => Group, (group) => group.user)
  groups: Group[]

  @OneToMany(() => GroupUser, (groupUser) => groupUser.user, { onDelete: 'CASCADE' })
  groupUsers: GroupUser[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
