import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/roles/roles.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.admin,
        },
      },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@example.com',
          password: 'secret',
          role: {
            id: RoleEnum.admin,
            name: 'Admin',
          },
        }),
      );
    }

    const countUser = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.normal || RoleEnum.limited,
        },
      },
    });

    if (!countUser && countUser < 3) {
      await this.repository.save(
        this.repository.create({
          firstName: 'Normal',
          lastName: 'Normal',
          email: 'normal@example.com',
          password: 'secret',
          role: {
            id: RoleEnum.normal,
            name: 'Normal',
          },
        }),
      );

      await this.repository.save(
        this.repository.create({
          firstName: 'Limited',
          lastName: 'Limited',
          email: 'limited@example.com',
          password: 'secret',
          role: {
            id: RoleEnum.limited,
            name: 'Limited',
          },
        }),
      );
    }
  }
}
