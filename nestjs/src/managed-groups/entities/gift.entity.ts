import { GroupGift } from '@/managed-groups/entities/group_gift.entity'
import { DEFAULT_IMAGE_URL } from '@/utils/constants/commons.const'
import MYSQL_CONST from '@/utils/constants/mysql.const'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('gifts')
export class Gift {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: MYSQL_CONST.MYSQL_VARCHAR_INDEX_LIMIT,
  })
  gift_name: string

  @Column({
    type: 'varchar',
    length: MYSQL_CONST.MYSQL_VARCHAR_INDEX_LIMIT,
  })
  description: string

  @Column({
    type: 'varchar',
    length: MYSQL_CONST.MYSQL_VARCHAR_INDEX_LIMIT,
    nullable: true,
    default: DEFAULT_IMAGE_URL,
  })
  image_url: string

  @OneToMany(() => GroupGift, (groupGift) => groupGift.gift)
  groupGifts: GroupGift[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
