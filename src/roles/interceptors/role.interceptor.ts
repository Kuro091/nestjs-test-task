import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/users/entities/user.entity';
import { RoleEnum } from '../roles.enum';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    const group =
      user.role?.name?.toLocaleLowerCase() ||
      RoleEnum.normal.toString().toLowerCase();

    // Transform the data (filter out private fields)
    return next.handle().pipe(
      map((data) => {
        return instanceToPlain(data, { groups: [group] });
      }),
    );
  }
}
