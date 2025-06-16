import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class CreateAgendamentoDto {
  @ApiProperty({
    description: 'Nome completo do solicitante',
    example: 'João Silva',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Endereço para coleta',
    example: 'Rua das Flores, 123 - Centro',
  })
  @IsString()
  endereco: string;

  @ApiProperty({
    description: 'Telefone para contato',
    example: '(11) 99999-9999',
  })
  @IsString()
  telefone: string;

  @ApiProperty({
    description: 'Data da coleta',
    example: '2024-12-20T10:00:00Z',
  })
  @IsString()
  data: string;

  @ApiProperty({
    description: 'Período da coleta',
    enum: ['MANHA', 'TARDE', 'NOITE'],
    example: 'MANHA',
  })
  @IsEnum(['MANHA', 'TARDE', 'NOITE'])
  periodo: 'MANHA' | 'TARDE' | 'NOITE';

  @ApiProperty({
    description: 'IDs dos materiais para coleta',
    example: ['material-id-1', 'material-id-2'],
    type: [String],
  })
  @IsString({ each: true })
  materiais: string[];

  @ApiProperty({
    description: 'Observações adicionais',
    example: 'Portão azul, casa com jardim',
    required: false,
  })
  @IsOptional()
  @IsString()
  observacoes?: string;

  @ApiProperty({
    description: 'ID do ponto de coleta (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  pontoColetaId?: string;
}

export class UpdateAgendamentoDto {
  @ApiProperty({
    description: 'Status do agendamento',
    enum: ['AGENDADO', 'CONFIRMADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'],
    example: 'CONFIRMADO',
    required: false,
  })
  @IsOptional()
  @IsEnum(['AGENDADO', 'CONFIRMADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'])
  status?: 'AGENDADO' | 'CONFIRMADO' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO';

  @ApiProperty({
    description: 'Peso estimado dos materiais (kg)',
    example: 5.5,
    required: false,
  })
  @IsOptional()
  pesoEstimado?: number;

  @ApiProperty({
    description: 'Observações adicionais',
    example: 'Coleta realizada com sucesso',
    required: false,
  })
  @IsOptional()
  @IsString()
  observacoes?: string;
}

