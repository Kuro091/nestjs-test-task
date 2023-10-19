import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { RoleEnum } from 'src/roles/roles.enum';
import { User } from 'src/users/entities/user.entity';

const allowedRegionIdsForLimitedUsers = [86118093, 86696489, 88186467];

@Injectable()
export class LocusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    const group =
      user.role?.name?.toLocaleLowerCase() || RoleEnum[RoleEnum.normal];

    if (group === RoleEnum[RoleEnum.limited]) {
      const { regionId } = request.query;
      if (
        !regionId ||
        !allowedRegionIdsForLimitedUsers.includes(parseInt(regionId))
      ) {
        return next.handle().pipe(
          map(() => {
            return {
              statusCode: 403,
              message: 'Forbidden, can only access limited regions.',
            };
          }),
        );
      }
    }

    if (group === RoleEnum[RoleEnum.normal]) {
      request.query.sideLoading = '';
    }

    // Transform the data (filter out private fields)
    return next.handle().pipe(
      map((data) => {
        return instanceToPlain(data, { groups: [group] });
      }),
    );
  }
}
