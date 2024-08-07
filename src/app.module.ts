import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: envs.dbUrl,
      // host: envs.dbHost,
      // port: envs.dbPort,
      // username: envs.dbUsername,
      // password: envs.dbPassword,
      // database: envs.dbName,
      logging: true,
      entities: ['dist/**/models/*/*{.entity.ts,.entity.js}'],
      synchronize: true,
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
