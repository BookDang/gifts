import { ACCESS_TOKEN } from '@/utils/constants/auth.constants'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    // We're extracting the token from the cookie 
    const tokenCookie = request.cookies[ACCESS_TOKEN]
    console.log('tokenCookie', tokenCookie)
    // We're extracting the token from the header
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      return false
    }
    try {
      const payload = await this.jwtService.verifyAsync(tokenCookie, {
        secret: this.configService.get<string>('JWT_SECRET'),
      })
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload
    } catch {
      return false
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
