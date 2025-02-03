import { Controller, Post, Body, Res, HttpStatus, Get, Req } from '@nestjs/common'
import { Response, Request } from 'express'
import { AuthService } from '@/auth/auth.service'
import { SignInDto } from '@/auth/dto/sign-in.dto'
import { JWT_TOKEN } from '@/utils/constants/user.const'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const isExistToken = await this.checkToken(req)
      if (isExistToken) {
        return res.status(HttpStatus.OK).json(isExistToken)
      }

      const token:
        | HttpStatus
        | {
            access_token: string
          } = await this.authService.signIn(signInDto.usernameOrEmail, signInDto.password)
      if (token instanceof Error) {
        throw new Error(token.message)
      }
      res.cookie(JWT_TOKEN, token, {
        httpOnly: true, // Prevent access via JavaScript
        secure: true, // Ensure HTTPS
        sameSite: 'strict', // Restrict cookie usage to same-origin requests
        maxAge: (10 * 60000), // 10 minutes
      })
      return res.status(HttpStatus.OK).json(token)
    } catch (error) {
      return res.status(error.message).json({ message: error.message })
    }
  }

  @Get('check-token')
  async checkToken(@Req() req: Request): Promise<{
    access_token: string | null
  }> {
    const token = req.cookies[JWT_TOKEN]
    if (!token) {
      return null
    }
    // return token
    return null
  }
}
