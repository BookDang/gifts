import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { USER_ROLES_ENUM } from '@/utils/enums/user.enum'
import { InjectRepository } from '@nestjs/typeorm'
import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { Not, Repository } from 'typeorm'

@Injectable()
export class AdminModeratorGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(GroupUser)
    private readonly groupUsersRepository: Repository<GroupUser>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { groupId } = request.params

    try {
      const payload = await this.jwtService.verifyAsync(request.cookies['jwt_token'].access_token, {
        secret: process.env.JWT_SECRET,
      })

      const groupUser = await this.groupUsersRepository.findOne({
        where: { user: { id: +payload.userId }, group: { id: +groupId } },
      })

      if (
        groupUser === null ||
        (groupUser.role !== USER_ROLES_ENUM.ADMIN && groupUser.role !== USER_ROLES_ENUM.MODERATOR)
      ) {
        return false
      }
    } catch {
      return false
    }
    return true
  }
}
