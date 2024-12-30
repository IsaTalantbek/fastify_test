import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify'
import cookie from '@fastify/cookie'

async function bootstrap() {
    const app = await (
        await NestFactory.create<NestFastifyApplication>(
            AppModule,
            new FastifyAdapter()
        )
    ).register(cookie, {
        secret: 'jwt', // for cookies signature
    })

    await app.listen(
        {
            port: 3000,
            host: '127.0.0.1',
        },
        (err, address) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
            console.log(`Server listening at ${address}`)
        }
    )
}
bootstrap()
