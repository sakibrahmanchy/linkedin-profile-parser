import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(80,  '192.168.0.102', () => {
    console.log('connected to mobile');
  });
}
bootstrap();
