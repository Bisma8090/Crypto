import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

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
        id: uuidv4(),
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
