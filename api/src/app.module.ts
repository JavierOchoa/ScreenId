import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl:
          process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
