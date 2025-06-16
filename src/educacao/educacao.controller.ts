import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { EducacaoService } from './educacao.service';

@ApiTags('educacao')
@Controller('educacao')
export class EducacaoController {
  constructor(private readonly educacaoService: EducacaoService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar conteúdo educativo',
    description: 'Lista todo o conteúdo educativo disponível'
  })
  @ApiQuery({
    name: 'tipo',
    required: false,
    description: 'Filtrar por tipo de conteúdo',
    enum: ['DICA', 'GUIA', 'ARTIGO', 'VIDEO'],
  })
  @ApiQuery({
    name: 'categoria',
    required: false,
    description: 'Filtrar por categoria',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de conteúdo educativo retornada com sucesso',
  })
  findAll(@Query('tipo') tipo?: string, @Query('categoria') categoria?: string) {
    return this.educacaoService.findAll(tipo, categoria);
  }

  @Get('categorias')
  @ApiOperation({ 
    summary: 'Conteúdo agrupado por categoria',
    description: 'Retorna conteúdo educativo agrupado por categoria'
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdo agrupado por categoria retornado com sucesso',
  })
  findByCategoria() {
    return this.educacaoService.findByCategoria();
  }

  @Get('tipos')
  @ApiOperation({ 
    summary: 'Conteúdo agrupado por tipo',
    description: 'Retorna conteúdo educativo agrupado por tipo'
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdo agrupado por tipo retornado com sucesso',
  })
  findByTipo() {
    return this.educacaoService.findByTipo();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar conteúdo por ID',
    description: 'Retorna um conteúdo educativo específico'
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdo encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Conteúdo não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.educacaoService.findOne(id);
  }
}

