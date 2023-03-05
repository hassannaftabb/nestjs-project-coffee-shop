import { Module } from '@nestjs/common';
import { CoffeesController } from 'src/controllers/coffees/coffees.controller';
import { CoffeesService } from 'src/services/coffees/coffees.service';

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
