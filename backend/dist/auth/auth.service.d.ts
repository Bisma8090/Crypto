import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateGoogleUser(profile: {
        googleId: string;
        email: string;
        name: string;
        picture?: string;
    }): Promise<User>;
    login(user: User): Promise<{
        access_token: string;
        user: User;
    }>;
}
