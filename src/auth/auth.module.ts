import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { PrismaService } from '../prisma.service'
import { AuthController } from './auth.controller'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'jwt',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, JwtStrategy, PrismaService],
    controllers: [AuthController],
})
export class AuthModule {}
