import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto, UpdateAgendamentoDto } from './dto/agendamento.dto';

@ApiTags('agendamentos')
@Controller('agendamentos')
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar novo agendamento',
    description: 'Cria um novo agendamento de coleta para o usuário autenticado'
  })
  @ApiResponse({
    status: 201,
    description: 'Agendamento criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Token de acesso inválido',
  })
  create(@Request() req, @Body() createAgendamentoDto: CreateAgendamentoDto) {
    return this.agendamentosService.create(req.user.id, createAgendamentoDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar agendamentos',
    description: 'Lista agendamentos do usuário autenticado ou todos (para admins)'
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por status do agendamento',
    enum: ['AGENDADO', 'CONFIRMADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'],
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de agendamentos retornada com sucesso',
  })
  findAll(@Request() req, @Query('status') status?: string) {
    const userId = req.user.role === 'ADMIN' ? undefined : req.user.id;
    return this.agendamentosService.findAll(userId, status);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar agendamento por ID',
    description: 'Retorna um agendamento específico'
  })
  @ApiResponse({
    status: 200,
    description: 'Agendamento encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Agendamento não encontrado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado',
  })
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.role === 'ADMIN' ? undefined : req.user.id;
    return this.agendamentosService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Atualizar agendamento',
    description: 'Atualiza dados de um agendamento'
  })
  @ApiResponse({
    status: 200,
    description: 'Agendamento atualizado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Agendamento não encontrado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado',
  })
  update(
    @Param('id') id: string,
    @Body() updateAgendamentoDto: UpdateAgendamentoDto,
    @Request() req,
  ) {
    const userId = req.user.role === 'ADMIN' ? undefined : req.user.id;
    return this.agendamentosService.update(id, updateAgendamentoDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Cancelar agendamento',
    description: 'Remove um agendamento do sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Agendamento removido com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Agendamento não encontrado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado',
  })
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.role === 'ADMIN' ? undefined : req.user.id;
    return this.agendamentosService.remove(id, userId);
  }
}

