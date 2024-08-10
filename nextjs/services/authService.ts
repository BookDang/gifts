import axios, { AxiosResponse } from "axios"

type TLoginData = {
  username: string
  password: string
}

interface IAuthService {
  login(loginData: TLoginData): Promise<any>
}

class AuthService implements IAuthService {
  // create a login method that returns a promise with axios type
  async login(loginData: TLoginData): Promise<AxiosResponse> {
    return axios.post('http://localhost/api/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: loginData,
    })
  }
}

export default AuthService
