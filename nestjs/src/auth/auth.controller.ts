import { AuthService } from '@/auth/auth.service'
import { SignInDto } from '@/auth/dto/sign-in.dto'
import HTTP_CODES_MESSAGES, { DEFAULT_ERROR_RESPONSE } from '@/utils/constants/http_codes.const'
import { JWT_TOKEN } from '@/utils/constants/user.const'
import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

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
        | Error
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
        // maxAge: (10 * 60000), // 10 minutes
        maxAge: 1000 * 60 * 2, // 2 minute
      })
      return res.status(HttpStatus.OK).json(token)
    } catch (error) {
      if (error.message) {
        return res.status(error.message).json({
          message: HTTP_CODES_MESSAGES[error.message],
          statusCode: error.message,
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(DEFAULT_ERROR_RESPONSE)
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
    return token
  }
}
