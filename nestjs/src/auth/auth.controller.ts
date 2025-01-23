import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from '@/auth/auth.service'
import { SignInDto } from '@/auth/dto/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const result = await this.authService.signIn(signInDto.usernameOrEmail, signInDto.password)
      if (result instanceof Error) {
        throw new Error(result.message)
      }
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      return res.status(error.message).json({ message: error.message })
    }
  }
}
