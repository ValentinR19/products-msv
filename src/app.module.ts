import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';
import { fail } from 'assert';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.dbHost,
      port: envs.dbPort,
      username: envs.dbUsername,
      password: envs.dbPassword,
      database: envs.dbName,
      logging: true,
      entities: ['dist/**/models/*/*{.entity.ts,.entity.js}'],
      synchronize: false,
      extra: {
        timezone: 'local',
      },
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
