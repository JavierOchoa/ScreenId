import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { AccountDeletionDto, CreateAuthDto, LoginUserDto} from './dto';
import { PasswordUpdateDto } from './dto/password-update.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { UpdateType, ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/user')
  @Auth()
  getUser(@GetUser() user: User) {
    return this.authService.getUser(user);
  }

  @Post('/update')
  @Auth()
  updatePassword(
    @GetUser() user: User,
    @Body() updatePasswordDto: PasswordUpdateDto,
  ) {
    return this.authService.updatePassword(user, updatePasswordDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete('/delete')
  @Auth()
  deactivateUser(
    @GetUser() user: User,
    @Body() accountDeletionDto: AccountDeletionDto,
  ) {
    return this.authService.deactivateUser(user, accountDeletionDto);
  }
}
