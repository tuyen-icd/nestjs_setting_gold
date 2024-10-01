import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersAppService } from '../users_app/users_app.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersAppService: UsersAppService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersAppService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user._id };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' }); // Refresh token hết hạn sau 7 ngày
        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(refreshToken: string) {
        try {
            const decoded = this.jwtService.verify(refreshToken);
            const payload = { username: decoded.username, sub: decoded.sub };
            const newAccessToken = this.jwtService.sign(payload);
            return { accessToken: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
