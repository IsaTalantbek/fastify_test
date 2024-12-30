import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { AppController } from './app.controller'
import { ProtectedController } from './protected/protected.controller'

@Module({
    imports: [AuthModule],
    controllers: [AppController, ProtectedController],
})
export class AppModule {}
