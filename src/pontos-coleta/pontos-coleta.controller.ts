import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PontosColetaService } from './pontos-coleta.service';

@ApiTags('pontos-coleta')
@Controller('pontos-coleta')
export class PontosColetaController {
  constructor(private readonly pontosColetaService: PontosColetaService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar pontos de coleta',
    description: 'Lista todos os pontos de coleta ativos, com filtro opcional por material'
  })
  @ApiQuery({
    name: 'materialId',
    required: false,
    description: 'ID do material para filtrar pontos de coleta',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pontos de coleta retornada com sucesso',
  })
  findAll(@Query('materialId') materialId?: string) {
    return this.pontosColetaService.findAll(materialId);
  }

  @Get('nearby')
  @ApiOperation({ 
    summary: 'Buscar pontos próximos',
    description: 'Encontra pontos de coleta próximos a uma localização'
  })
  @ApiQuery({
    name: 'latitude',
    required: true,
    description: 'Latitude da localização',
    type: Number,
  })
  @ApiQuery({
    name: 'longitude',
    required: true,
    description: 'Longitude da localização',
    type: Number,
  })
  @ApiQuery({
    name: 'radius',
    required: false,
    description: 'Raio de busca em km (padrão: 10km)',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Pontos próximos encontrados',
  })
  findNearby(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('radius') radius?: string,
  ) {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const rad = radius ? parseFloat(radius) : 10;
    
    return this.pontosColetaService.findNearby(lat, lng, rad);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar ponto de coleta por ID',
    description: 'Retorna detalhes de um ponto de coleta específico'
  })
  @ApiResponse({
    status: 200,
    description: 'Ponto de coleta encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Ponto de coleta não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.pontosColetaService.findOne(id);
  }
}

