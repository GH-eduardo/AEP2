import { Controller, Get, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { EstatisticasService } from './estatisticas.service';

@ApiTags('estatisticas')
@Controller('estatisticas')
export class EstatisticasController {
  constructor(private readonly estatisticasService: EstatisticasService) {}

  @Get('usuario')
  @ApiOperation({ 
    summary: 'Estatísticas do usuário',
    description: 'Retorna estatísticas pessoais do usuário autenticado'
  })
  @ApiQuery({
    name: 'mes',
    required: false,
    description: 'Mês específico (formato: YYYY-MM)',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas do usuário retornadas com sucesso',
  })
  getEstatisticasUsuario(@Request() req, @Query('mes') mes?: string) {
    return this.estatisticasService.getEstatisticasUsuario(req.user.id, mes);
  }

  @Get('ranking')
  @ApiOperation({ 
    summary: 'Ranking de usuários',
    description: 'Retorna ranking dos usuários com mais pontos'
  })
  @ApiQuery({
    name: 'limite',
    required: false,
    description: 'Número máximo de usuários no ranking (padrão: 10)',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Ranking retornado com sucesso',
  })
  getRanking(@Query('limite') limite?: string) {
    const limiteNum = limite ? parseInt(limite) : 10;
    return this.estatisticasService.getRankingUsuarios(limiteNum);
  }

  @Get('gerais')
  @ApiOperation({ 
    summary: 'Estatísticas gerais',
    description: 'Retorna estatísticas gerais da plataforma'
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas gerais retornadas com sucesso',
  })
  getEstatisticasGerais() {
    return this.estatisticasService.getEstatisticasGerais();
  }

  @Get('periodo')
  @ApiOperation({ 
    summary: 'Estatísticas por período',
    description: 'Retorna estatísticas agrupadas por período'
  })
  @ApiQuery({
    name: 'periodo',
    required: false,
    description: 'Período de agrupamento',
    enum: ['mes', 'ano'],
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas por período retornadas com sucesso',
  })
  getEstatisticasPorPeriodo(@Query('periodo') periodo?: 'mes' | 'ano') {
    return this.estatisticasService.getEstatisticasPorPeriodo(periodo);
  }
}

