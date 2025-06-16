import { Module } from '@nestjs/common';
import { EducacaoService } from './educacao.service';
import { EducacaoController } from './educacao.controller';

@Module({
  controllers: [EducacaoController],
  providers: [EducacaoService],
})
export class EducacaoModule {}

