import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 0, name: 'Morbius' },
    { id: 1, name: 'Spiderman' },
    { id: 2, name: 'Morbius' },
    { id: 3, name: 'Vulture' },
  ];

  findAll(name?: string): User[] {
    if (name) {
      return this.users.filter((user) => user.name === name);
    }
    return this.users;
  }
  findById(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }
  createUser(createUserDto: CreateUserDto) {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }
}
