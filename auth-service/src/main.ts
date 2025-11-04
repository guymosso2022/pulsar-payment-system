import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const httpApp = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  await httpApp.listen(port);
  console.log(`HTTP server listening on port ${port}`);
}
bootstrap();
