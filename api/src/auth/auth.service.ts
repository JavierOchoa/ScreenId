import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtPayload } from './interfaces';
import { User } from './entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}
  async create(createAuthDto: CreateAuthDto) {
    const {password, ...userData} = createAuthDto
    const user = this.userRepository.create({
      ...userData,
      password: bcrypt.hashSync(password, 10)
    })
    await this.userRepository.save(user);
    delete user.password
    return {
      user,
      token: this.getJwtToken({id: user.id})
    }
  }

  async login(loginUserDto: LoginUserDto){
    const {password, email} = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (!user) throw new UnauthorizedException('Credentials not valid (email)');
    if(!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Credentials not valid (password)');
    return {
      user,
      token: this.getJwtToken({id: user.id})
    }
  } 

  findAll() {
    return `This action returns all auth`;
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

  private getJwtToken(payload: JwtPayload){
    return this.jwtService.sign(payload);
  }
}
