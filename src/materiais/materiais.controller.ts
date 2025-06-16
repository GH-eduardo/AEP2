import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MateriaisService } from './materiais.service';

@ApiTags('materiais')
@Controller('materiais')
export class MateriaisController {
  constructor(private readonly materiaisService: MateriaisService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar materiais',
    description: 'Lista todos os tipos de materiais recicláveis disponíveis'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de materiais retornada com sucesso',
  })
  findAll() {
    return this.materiaisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar material por ID',
    description: 'Retorna detalhes de um material específico'
  })
  @ApiResponse({
    status: 200,
    description: 'Material encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Material não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.materiaisService.findOne(id);
  }
}

