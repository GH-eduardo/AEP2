import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CooperativasService } from './cooperativas.service';

@ApiTags('cooperativas')
@Controller('cooperativas')
export class CooperativasController {
  constructor(private readonly cooperativasService: CooperativasService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar cooperativas',
    description: 'Lista todas as cooperativas ativas'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de cooperativas retornada com sucesso',
  })
  findAll() {
    return this.cooperativasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar cooperativa por ID',
    description: 'Retorna detalhes de uma cooperativa específica'
  })
  @ApiResponse({
    status: 200,
    description: 'Cooperativa encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Cooperativa não encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.cooperativasService.findOne(id);
  }
}

