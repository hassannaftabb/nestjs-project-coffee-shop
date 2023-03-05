import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from 'src/dtos/coffees/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/dtos/coffees/update-coffee.dto';
import { Coffee } from 'src/entities/coffees/Coffee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}
  //Get all the coffees in the database
  findAll() {
    return this.coffeeRepository.find();
  }
  //Find one coffee by its ID
  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id: id } });
    if (!coffee) {
      throw new NotFoundException(`Couldn't find coffee against #${id}`);
    }
    return coffee;
  }
  //Create a new Coffee
  createCoffe(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }
  // Update an existing coffee data
  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const updatedCoffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!updatedCoffee) {
      throw new NotFoundException(`Couldn't find coffee against #${id}`);
    }
    return this.coffeeRepository.save(updatedCoffee);
  }
  //Remove a coffee from database
  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
