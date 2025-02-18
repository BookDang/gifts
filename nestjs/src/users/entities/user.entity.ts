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
import { Group } from '@/managed-groups/entities/group.entity'
import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { Point } from '@/managed-groups/entities/point.entity'

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

  @OneToMany(() => Point, (point) => point.user, { onDelete: 'CASCADE' })
  points: Point[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
