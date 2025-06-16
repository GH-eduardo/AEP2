import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateAgendamentoDto, UpdateAgendamentoDto } from './dto/agendamento.dto';

@Injectable()
export class AgendamentosService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createAgendamentoDto: CreateAgendamentoDto) {
    const { materiais, ...agendamentoData } = createAgendamentoDto;

    const agendamento = await this.prisma.agendamento.create({
      data: {
        ...agendamentoData,
        data: new Date(agendamentoData.data),
        userId,
        materiais: {
          create: materiais.map(materialId => ({
            materialId,
          })),
        },
      },
      include: {
        materiais: {
          include: {
            material: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        pontoColeta: true,
      },
    });

    return agendamento;
  }

  async findAll(userId?: string, status?: string) {
    const where: any = {};
    
    if (userId) {
      where.userId = userId;
    }
    
    if (status) {
      where.status = status;
    }

    return this.prisma.agendamento.findMany({
      where,
      include: {
        materiais: {
          include: {
            material: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        pontoColeta: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId?: string) {
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id },
      include: {
        materiais: {
          include: {
            material: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        pontoColeta: true,
      },
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    // Se userId fornecido, verificar se o usuário tem acesso
    if (userId && agendamento.userId !== userId) {
      throw new ForbiddenException('Acesso negado a este agendamento');
    }

    return agendamento;
  }

  async update(id: string, updateAgendamentoDto: UpdateAgendamentoDto, userId?: string) {
    const agendamento = await this.findOne(id, userId);

    const updatedAgendamento = await this.prisma.agendamento.update({
      where: { id },
      data: updateAgendamentoDto,
      include: {
        materiais: {
          include: {
            material: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        pontoColeta: true,
      },
    });

    // Se agendamento foi concluído, atualizar estatísticas
    if (updateAgendamentoDto.status === 'CONCLUIDO' && updateAgendamentoDto.pesoEstimado) {
      await this.atualizarEstatisticas(agendamento.userId, updateAgendamentoDto.pesoEstimado);
    }

    return updatedAgendamento;
  }

  async remove(id: string, userId?: string) {
    await this.findOne(id, userId);

    return this.prisma.agendamento.delete({
      where: { id },
    });
  }

  private async atualizarEstatisticas(userId: string, peso: number) {
    const mesAtual = new Date().toISOString().slice(0, 7); // YYYY-MM
    const co2Economizado = peso * 0.5; // 0.5kg CO2 por kg reciclado
    const pontosGanhos = peso * 10; // 10 pontos por kg

    // Atualizar ou criar estatística do mês
    await this.prisma.estatistica.upsert({
      where: {
        userId_mesReferencia: {
          userId,
          mesReferencia: mesAtual,
        },
      },
      update: {
        totalReciclado: {
          increment: peso,
        },
        co2Economizado: {
          increment: co2Economizado,
        },
        coletasRealizadas: {
          increment: 1,
        },
      },
      create: {
        userId,
        mesReferencia: mesAtual,
        totalReciclado: peso,
        co2Economizado,
        coletasRealizadas: 1,
      },
    });

    // Atualizar pontos do usuário
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        points: {
          increment: pontosGanhos,
        },
      },
    });
  }
}

