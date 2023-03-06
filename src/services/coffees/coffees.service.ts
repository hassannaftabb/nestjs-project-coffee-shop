import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from 'src/dtos/coffees/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/dtos/coffees/update-coffee.dto';
import { PaginationQueryDto } from 'src/dtos/common/pagination-query.dto';
import { Coffee } from 'src/entities/coffees/Coffee.entity';
import { Flavour } from 'src/entities/coffees/Flavour.entity';
import { Event } from 'src/entities/events/Event.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavour)
    private readonly flavourRepository: Repository<Flavour>,
    private readonly connection: Connection,
  ) {}
  //Get all the coffees in the database
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: ['flavours'],
      skip: offset,
      take: limit,
    });
  }
  //Find one coffee by its ID
  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: id },
      relations: ['flavours'],
    });
    if (!coffee) {
      throw new NotFoundException(`Couldn't find coffee against #${id}`);
    }
    return coffee;
  }
  //Create a new Coffee
  async createCoffe(createCoffeeDto: CreateCoffeeDto) {
    const flavours = await Promise.all(
      createCoffeeDto.flavours.map((name) => this.preLoadFlavour(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavours,
    });
    return this.coffeeRepository.save(coffee);
  }
  // Update an existing coffee data
  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavours =
      updateCoffeeDto.flavours &&
      (await Promise.all(
        updateCoffeeDto.flavours.map((name) => this.preLoadFlavour(name)),
      ));
    const updatedCoffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavours,
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

  async recommendCoffe(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preLoadFlavour(name: string): Promise<Flavour> {
    const existingFlavour = await this.flavourRepository.findOne({
      where: { name: name },
    });
    if (existingFlavour) {
      return existingFlavour;
    }
    return this.flavourRepository.create({ name });
  }
}
