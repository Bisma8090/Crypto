import { User } from './user.entity';
export declare class UsersService {
    findOrCreate(profile: {
        googleId: string;
        email: string;
        name: string;
        picture?: string;
    }): Promise<User>;
    findById(id: string): Promise<User | undefined>;
}
