import axios, { AxiosError, AxiosResponse } from 'axios'
import { TLogin } from '@/types/user'

export type TLoginResponse = {
  access_token: string
}

export type TLoginError = {
  statusCode: number
  message: string
}
interface IAuthService {
  login(loginData: TLogin): Promise<any>
}

class AuthService implements IAuthService {
  // create a login method that returns a promise with axios type
  async login(
    loginData: TLogin,
  ): Promise<AxiosResponse<AxiosError | TLoginResponse>> {
    return axios.post('http://localhost/api/auth/login', loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export default AuthService
