import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './modules/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.NEST_APP_DB_HOST,
      port: 5432,
      username: 'postgres',
      password: 'hardstone349',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: Boolean(process.env.NEST_APP_DB_SYNCHRONIZE),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
