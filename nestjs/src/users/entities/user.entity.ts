import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { GENDER } from '@/utils/constants/user.const'

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

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
