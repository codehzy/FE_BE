import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3333;
  createSwagger(app);

  await app.listen(PORT, () => {
    Logger.log(`API服务已经启动,服务请访问:http://localhost:${PORT}`);
    Logger.log(`Socket服务已经启动,服务请访问:http://localhost:3002`);
    Logger.log(`swagger已经启动,服务请访问:http://localhost:${PORT}/docs`);
  });
}
bootstrap();
