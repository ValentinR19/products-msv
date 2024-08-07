import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: envs.dbUrl,
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
