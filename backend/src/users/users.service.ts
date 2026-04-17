import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from './user.entity';

// In-memory store (replace with DB in production)
const users: User[] = [];

@Injectable()
export class UsersService {
  async findOrCreate(profile: {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<User> {
    let user = users.find((u) => u.googleId === profile.googleId);
    if (!user) {
      user = {
        id: randomUUID(),
        email: profile.email,
        name: profile.name,
        picture: profile.picture,
        googleId: profile.googleId,
        createdAt: new Date(),
      };
      users.push(user);
    }
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    return users.find((u) => u.id === id);
  }
}
