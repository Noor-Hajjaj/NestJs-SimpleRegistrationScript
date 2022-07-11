/* eslint-disable prettier/prettier */
// import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(/*config: ConfigService*/) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: /*config.get('JWT_SECRET')*/'super-duper-secret-key',
    });
  }

  validate(payload) {
    return payload;
  }
}
