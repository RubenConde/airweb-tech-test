import { Controller } from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { AppService } from 'src/app.service';

@Controller()
@ApiTags('Root')
@ApiExcludeController()
export class AppController {
   constructor(private readonly appService: AppService) {}
}
