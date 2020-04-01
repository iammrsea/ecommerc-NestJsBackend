import { UsersService } from './users.service';
import {
  Controller,
  Param,
  Body,
  Get,
  UseInterceptors,
  ParseIntPipe,
  NotFoundException,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { User } from './user.entity';
import { ExcludePasswordInterceptor } from 'src/interceptors/password.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResMessage } from 'src/utils/ResMsg';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('Admin')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  @UseInterceptors(ExcludePasswordInterceptor)
  @Roles('Employee')
  async findAll(@Query() queries): Promise<User[]> {
    return await this.usersService.find(
      queries.role,
      queries.limit,
      queries.cursor,
    );
  }

  @Get(':userId')
  @UseInterceptors(ExcludePasswordInterceptor)
  async findOne(@Param('userId', new ParseIntPipe()) userId: number) {
    const foundUser = await this.usersService.findOne(userId);
    if (!foundUser) {
      throw new NotFoundException();
    }
    return foundUser;
  }

  @Roles('Customer', 'Employee')
  @Get(':userId/orders')
  @UseInterceptors(TransformInterceptor)
  @UseInterceptors(ExcludePasswordInterceptor)
  async findCustomerOrders(
    @Param('userId', new ParseIntPipe()) userId: number,
  ) {
    return await this.usersService.findCustomerOrders(userId);
  }

  @Delete(':userId')
  async delete(@Param('userId', new ParseIntPipe()) userId: number) {
    await this.usersService.remove(userId);
    return new ResMessage('Deleted Successfully');
  }

  @Put(':userId')
  @Roles('Employee', 'Customer')
  async update(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    updateUserDto.id = +userId;
    await this.usersService.update(updateUserDto);
    return new ResMessage('Updated Successfully');
  }
}
