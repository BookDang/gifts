import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      throw new UnauthorizedException('No token provided')
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      throw new UnauthorizedException('No token provided')
    }

    try {
      const decoded = this.jwtService.verify(token)
      req.user = decoded
      next()
    } catch (err) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
