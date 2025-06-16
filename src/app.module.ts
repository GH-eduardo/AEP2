import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma.module';
import { UsersModule } from './users/users.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { PontosColetaModule } from './pontos-coleta/pontos-coleta.module';
import { MateriaisModule } from './materiais/materiais.module';
import { EstatisticasModule } from './estatisticas/estatisticas.module';
import { EducacaoModule } from './educacao/educacao.module';
import { CooperativasModule } from './cooperativas/cooperativas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AgendamentosModule,
    PontosColetaModule,
    MateriaisModule,
    EstatisticasModule,
    EducacaoModule,
    CooperativasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

