import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateCoffeeDto } from 'src/dtos/coffees/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/dtos/coffees/update-coffee.dto';
import { Coffee } from 'src/entities/coffees/Coffee.entity';
import { CoffeesService } from 'src/services/coffees/coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}
  @Get()
  findAll() {
    const allCoffees: Coffee[] = this.coffeeService.findAll();
    return allCoffees;
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coffeeService.findOne('' + id);
  }
  @Post()
  addCoffe(@Body() createCoffeeDto: CreateCoffeeDto) {
    this.coffeeService.createCoffe(createCoffeeDto);
    return createCoffeeDto;
  }
  @Patch(':id')
  updateCoffe(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }
  @Delete(':id')
  deleteCoffe(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}
