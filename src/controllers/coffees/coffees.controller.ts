import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateCoffeeDto } from 'src/dtos/coffees/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/dtos/coffees/update-coffee.dto';
import { PaginationQueryDto } from 'src/dtos/common/pagination-query.dto';
import { CoffeesService } from 'src/services/coffees/coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    const allCoffees = this.coffeeService.findAll(paginationQuery);
    return allCoffees;
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coffeeService.findOne(id);
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
  deleteCoffe(@Param('id') id: number) {
    return this.coffeeService.remove(id);
  }
}
