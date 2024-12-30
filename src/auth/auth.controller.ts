import {
    Controller,
    Request,
    Post,
    UseGuards,
    Get,
    Body,
    Res,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body, @Res({ passthrough: true }) reply: any) {
        const user = await this.authService.validateUser(
            body.email,
            body.password
        )
        if (!user) {
            reply.status(401).send({ message: 'Invalid credentials' })
            return
        }

        const { access_token } = await this.authService.login(user)
        reply.setCookie('Authentication', access_token, {
            httpOnly: true,
            path: '/',
        })
        return { message: 'Login successful' } // Fastify-style response
    }

    @Post('register')
    async register(@Body() body) {
        await this.authService.register(body.email, body.password)
        return { message: 'Registration successful' }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }
}
