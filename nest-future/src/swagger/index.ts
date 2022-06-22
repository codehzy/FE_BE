import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerOptions = new DocumentBuilder()
  .setTitle('CRUD')
  .setDescription('一个练手标准项目')
  .setVersion('1.0')
  .addTag('future')
  .addBasicAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'jwt',
  )
  .build();

export function createSwagger(app) {
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/docs', app, document);
}
