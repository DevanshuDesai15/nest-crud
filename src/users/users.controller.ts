import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

// WE CAN DEFINE TAGS FOR THE SWAGGER TO DIFFERENTIATE
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUser(@Query('name') name?: string): User[] {
    return this.userService.findAll(name);
  }

  @ApiOkResponse({
    type: User,
    description: 'Here we can get data as per the id',
  })
  @ApiNotFoundResponse()
  @Get(':id')
  // HERE PASRSEINTPIPE IS A PIPE METHOD WHICH IS USED FOR VALIDATION AND TRANSFORMATION
  // PIPES CAN BE ADDED TO CONTROLLERS/CONTROLLERS-METHOD
  // PIPES CAN BE SEEN AS THE MIDDLEWARE
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.userService.findById(id);

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.userService.createUser(body);
  }
}
