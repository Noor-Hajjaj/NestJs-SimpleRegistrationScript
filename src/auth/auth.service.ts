/* eslint-disable prettier/prettier */
// handles busines logic (connecting to database etc...)
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    @InjectModel('User') private userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.userModel.findOne({ email: dto.email });
    // console.log(user);
    if (user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    const newuser = new this.userModel({
      email: dto.email,
      password: hash,
    });
    await newuser.save();
    // delete newuser.password;
    return this.signToken(newuser.id);
  }

  async login(dto: AuthDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    const passmatch = await argon.verify(user.password, dto.password);
    if (!passmatch) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    // delete user.password;
    return this.signToken(user.id);
  }

  async signToken(userId) : Promise<{accessToken : string}> {
    const payload = { sub: userId };
    const key = this.config.get('JWT_SECRET')
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret:  key,
    });

    return{accessToken: token}
  }
}
