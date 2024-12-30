import { Controller, Get } from '@nestjs/common'

@Controller('test')
export class AppController {
    @Get()
    getTest() {
        return 'API работает!'
    }
}
