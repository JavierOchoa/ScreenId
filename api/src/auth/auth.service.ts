import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtPayload, UpdateType } from './interfaces';
import { User } from './entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {AccountDeletionDto, LoginUserDto} from './dto';
import { AuthGuard } from '@nestjs/passport';
import { PasswordUpdateDto } from './dto/password-update.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const { password, ...userData } = createAuthDto;
    const user = this.userRepository.create({
      ...userData,
      password: bcrypt.hashSync(password, 10),
    });
    await this.userRepository.save(user);
    delete user.password;
    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (!user) throw new UnauthorizedException('Email does not exist');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials not valid (password)');
    if (user.isActive === false)
      throw new UnauthorizedException('This account is deactivated');
    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  getUser(user: User) {
    const { fullName, email } = user;
    return {
      fullName,
      email,
    };
  }

  async updatePassword(user: User, updatePasswordDto: PasswordUpdateDto) {
    const { email } = user;
    const { currentPassword, newPassword, newEmail, type } = updatePasswordDto;
    const userOnDB = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (!userOnDB)
      throw new UnauthorizedException('Credentials not valid (email)');
    if (!bcrypt.compareSync(currentPassword, userOnDB.password))
      throw new UnauthorizedException('Credentials not valid (password)');
    if (type === 'email') {
      userOnDB.email = newEmail;
      await this.userRepository.save(userOnDB);
      return {
        // token: this.getJwtToken({id: user.id}),
        successful: true,
        message: 'Email has been updated',
      };
    }

    if (type === 'password') {
      // const { currentPassword, newPassword } = updatePasswordDto;
      userOnDB.password = bcrypt.hashSync(newPassword, 10);
      await this.userRepository.save(userOnDB);
      return {
        successful: true,
        message: 'Password has been updated',
      };
    }
  }

  async deactivateUser(user: User, accountDeletionDto: AccountDeletionDto) {
    const { id, email } = user;
    const { currentPassword } = accountDeletionDto;
    console.log(currentPassword);
    try {
      const userOnDb = await this.userRepository.findOne({
        where: { id },
        select: { email: true, password: true, id: true },
      });
      if (!bcrypt.compareSync(currentPassword, userOnDb.password))
        throw new UnauthorizedException('Credentials not valid (password)');
      userOnDb.isActive = false;
      await this.userRepository.save(userOnDb);
      return {
        successful: true,
        message: `User ${email} has been deactivated`,
      };
    } catch (e) {
      console.log(e);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
