import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { IUser } from '@/utils/interfaces/user.interface'
import { PASSWORD_REGEX } from '@/utils/constants/auth.constants'
import { EUserRoles } from '@/utils/enums/user-role.enum'

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true, match: PASSWORD_REGEX, select: false })
  password: string

  @Prop({ required: true })
  birthday: Date

  @Prop({ enum: EUserRoles, default: EUserRoles.Admin })
  roles: EUserRoles

  @Prop({ default: new Date() })
  createdAt: Date

  @Prop({ default: null })
  updatedAt: Date | null

  @Prop({ default: null })
  deletedAt: Date | null
}

export type UserDocument = HydratedDocument<User>

const UserSchema = SchemaFactory.createForClass(User)

// Hash the password before saving the user
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (error) {
    return next(error)
  }
})

export { UserSchema }
