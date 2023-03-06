import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from 'src/controllers/coffees/coffees.controller';
import { Coffee } from 'src/entities/coffees/Coffee.entity';
import { Flavour } from 'src/entities/coffees/Flavour.entity';
import { Event } from 'src/entities/events/Event.entity';
import { CoffeesService } from 'src/services/coffees/coffees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavour, Event])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
