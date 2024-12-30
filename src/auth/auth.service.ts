import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma.service'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } })
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10)
        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        })
    }
}