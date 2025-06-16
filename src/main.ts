import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Configurar validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('EcoConnect API')
    .setDescription('API da plataforma de reciclagem EcoConnect')
    .setVersion('1.0')
    .addTag('auth', 'Autenticação e autorização')
    .addTag('users', 'Gestão de usuários')
    .addTag('agendamentos', 'Agendamento de coletas')
    .addTag('pontos-coleta', 'Pontos de coleta')
    .addTag('materiais', 'Materiais recicláveis')
    .addTag('estatisticas', 'Estatísticas e relatórios')
    .addTag('educacao', 'Conteúdo educativo')
    .addTag('cooperativas', 'Gestão de cooperativas')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: (a: any, b: any) => {
        const methodOrder = ['post', 'get', 'patch', 'delete'];
        const aMethod = a.get('method').toLowerCase();
        const bMethod = b.get('method').toLowerCase();
        
        if (aMethod !== bMethod) {
          return methodOrder.indexOf(aMethod) - methodOrder.indexOf(bMethod);
        }
        
        return a.get('path').localeCompare(b.get('path'));
      },
    },
  });

  // Configurar prefixo global da API
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 EcoConnect API rodando em http://localhost:${port}`);
  console.log(`📚 Documentação Swagger disponível em http://localhost:${port}/api/docs`);
}

bootstrap();

