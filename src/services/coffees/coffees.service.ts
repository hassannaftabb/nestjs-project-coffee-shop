import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from 'src/entities/coffees/Coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Test Coffee 1',
      brand: 'Test Brand 1',
      flavours: ['chocolate', 'strawberry'],
    },
  ];
  findAll() {
    return this.coffees;
  }
  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Couldn't find coffee against #${id}`);
    }
    return coffee;
  }
  createCoffe(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }
  update(id: string, createCoffeeDto: any) {
    const existingCoffe = this.findOne(id);
  }
  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
