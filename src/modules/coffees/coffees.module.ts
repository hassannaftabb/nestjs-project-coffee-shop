import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from 'src/controllers/coffees/coffees.controller';
import { Coffee } from 'src/entities/coffees/Coffee.entity';
import { CoffeesService } from 'src/services/coffees/coffees.service';

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService],
  imports: [TypeOrmModule.forFeature([Coffee])],
})
export class CoffeesModule {}
