import { Injectable, NestMiddleware, Req, Res, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  async use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    if (req.cookies['jwt_token']) {
      try {
        const jwtService = new JwtService()
        const payload = await jwtService.verifyAsync(req.cookies['jwt_token'].access_token, {
          secret: process.env.JWT_SECRET,
        })
        req['user'] = payload
        next()
      } catch (error) {
        throw new UnauthorizedException()
      }
    } else {
      throw new UnauthorizedException()
    }
  }
}
