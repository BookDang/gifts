import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { GENDER } from '@/utils/constants/user.const'
import { Group } from '@/groups/entities/group.entity'
import { GroupUser } from '@/groups/entities/group_user.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string

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
