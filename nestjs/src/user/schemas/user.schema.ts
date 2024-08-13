import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { IUser } from '@/utils/interfaces/user.interface'
import { UserRoles } from '@/utils/enums/user-role.enum'

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true, select: false })
  password: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  birthday: Date

  @Prop({ required: true, enum: UserRoles, default: 'member' })
  roles: string

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date

  @Prop({ default: null })
  deletedAt: Date
}

export type UserDocument = HydratedDocument<User>

export const UserSchema = SchemaFactory.createForClass(User)
