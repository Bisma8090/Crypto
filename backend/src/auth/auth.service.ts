import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateGoogleUser(profile: {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<User> {
    return this.usersService.findOrCreate(profile);
  }

  async login(user: User): Promise<{ access_token: string; user: User }> {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
