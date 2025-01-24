import { Controller, Post, Body, Res, HttpStatus, Get, Req } from '@nestjs/common'
import { Response, Request } from 'express'
import { AuthService } from '@/auth/auth.service'
import { SignInDto } from '@/auth/dto/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response): Promise<any> {
    try {
      const token = await this.authService.signIn(signInDto.usernameOrEmail, signInDto.password)
      if (token instanceof Error) {
        throw new Error(token.message)
      }
      res.cookie('jwt', token, {
        httpOnly: true, // Prevent access via JavaScript
        secure: true, // Ensure HTTPS
        sameSite: 'strict', // Restrict cookie usage to same-origin requests
        maxAge: 60000,
      })
      return res.status(HttpStatus.OK).json(token)
    } catch (error) {
      return res.status(error.message).json({ message: error.message })
    }
  }

  @Get('check-token')
  async checkToken(@Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const token = req.cookies.jwt
      console.log('token', token)

      if (!token) {
        throw new Error(HttpStatus.UNAUTHORIZED.toString())
      }
      return res.status(HttpStatus.OK).json({ message: 'Token is valid', token })
    } catch (error) {
      return res.status(error.message).json({ message: error.message })
    }
  }
}
