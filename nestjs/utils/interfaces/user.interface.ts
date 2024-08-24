import { IBase } from '@/utils/interfaces/base.interface'

export interface IUser extends IBase {
  email: string
  password: string
  name: string
  birthday: Date
  roles: string
}
