import { Module } from '@nestjs/common';
import { PontosColetaService } from './pontos-coleta.service';
import { PontosColetaController } from './pontos-coleta.controller';

@Module({
  controllers: [PontosColetaController],
  providers: [PontosColetaService],
})
export class PontosColetaModule {}

