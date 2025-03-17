import { Gift } from '@/managed-groups/entities/gift.entity'
import { Group } from '@/managed-groups/entities/group.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('group_gifts')
@Index(['group', 'gift'], { unique: true })
export class GroupGift {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'int',
    default: 0,
  })
  quantity: number

  @ManyToOne(() => Gift, (gift) => gift.groupGifts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "gift_id" })
  gift: Gift

  @ManyToOne(() => Group, (group) => group.groupGifts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "group_id" })
  group: Group

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
