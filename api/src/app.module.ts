import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';

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
      host: process.env.PGHOST,
      port: +process.env.PGPORT,
      database: process.env.PGDATABASE,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    MediaModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
