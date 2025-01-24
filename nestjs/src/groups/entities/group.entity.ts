import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '@/users/entities/user.entity'

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
  })
  avatar_url: string

  @ManyToOne(() => User, (user) => user.groups)
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
