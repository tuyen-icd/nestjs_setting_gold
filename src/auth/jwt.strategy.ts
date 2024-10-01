import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersAppService } from '../users_app/users_app.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersAppService: UsersAppService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'yourSecretKey', // Thay đổi khóa bí mật của bạn tại đây
        });
    }

    async validate(payload: any) {
        return this.usersAppService.findByEmail(payload.username);
    } 
}
