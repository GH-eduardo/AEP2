import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class EstatisticasService {
  constructor(private prisma: PrismaService) {}

  async getEstatisticasUsuario(userId: string, mes?: string) {
    const where: any = { userId };
    
    if (mes) {
      where.mesReferencia = mes;
    }

    const estatisticas = await this.prisma.estatistica.findMany({
      where,
      orderBy: {
        mesReferencia: 'desc',
      },
    });

    // Calcular totais
    const totais = estatisticas.reduce(
      (acc, stat) => ({
        totalReciclado: acc.totalReciclado + stat.totalReciclado,
        co2Economizado: acc.co2Economizado + stat.co2Economizado,
        coletasRealizadas: acc.coletasRealizadas + stat.coletasRealizadas,
      }),
      { totalReciclado: 0, co2Economizado: 0, coletasRealizadas: 0 }
    );

    return {
      estatisticas,
      totais,
    };
  }

  async getRankingUsuarios(limite: number = 10) {
    const usuarios = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        points: true,
      },
      orderBy: {
        points: 'desc',
      },
      take: limite,
    });

    return usuarios.map((user, index) => ({
      posicao: index + 1,
      ...user,
    }));
  }

  async getEstatisticasGerais() {
    // Total de usuários
    const totalUsuarios = await this.prisma.user.count({
      where: { role: 'CITIZEN' },
    });

    // Total de agendamentos
    const totalAgendamentos = await this.prisma.agendamento.count();

    // Agendamentos por status
    const agendamentosPorStatus = await this.prisma.agendamento.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    // Total reciclado (soma de todas as estatísticas)
    const totalReciclado = await this.prisma.estatistica.aggregate({
      _sum: {
        totalReciclado: true,
        co2Economizado: true,
        coletasRealizadas: true,
      },
    });

    // Materiais mais coletados
    const materiaisMaisColetados = await this.prisma.agendamentoMaterial.groupBy({
      by: ['materialId'],
      _count: {
        materialId: true,
      },
      orderBy: {
        _count: {
          materialId: 'desc',
        },
      },
      take: 5,
    });

    // Buscar nomes dos materiais
    const materiaisComNomes = await Promise.all(
      materiaisMaisColetados.map(async (item) => {
        const material = await this.prisma.material.findUnique({
          where: { id: item.materialId },
          select: { nome: true },
        });
        return {
          material: material?.nome || 'Desconhecido',
          quantidade: item._count.materialId,
        };
      })
    );

    return {
      totalUsuarios,
      totalAgendamentos,
      agendamentosPorStatus,
      totalReciclado: totalReciclado._sum.totalReciclado || 0,
      totalCo2Economizado: totalReciclado._sum.co2Economizado || 0,
      totalColetas: totalReciclado._sum.coletasRealizadas || 0,
      materiaisMaisColetados: materiaisComNomes,
    };
  }

  async getEstatisticasPorPeriodo(periodo: 'mes' | 'ano' = 'mes') {
    const agora = new Date();
    let dataInicio: Date;

    if (periodo === 'mes') {
      dataInicio = new Date(agora.getFullYear(), agora.getMonth(), 1);
    } else {
      dataInicio = new Date(agora.getFullYear(), 0, 1);
    }

    const estatisticas = await this.prisma.estatistica.findMany({
      where: {
        createdAt: {
          gte: dataInicio,
        },
      },
      orderBy: {
        mesReferencia: 'asc',
      },
    });

    // Agrupar por mês
    const estatisticasPorMes = estatisticas.reduce((acc, stat) => {
      const mes = stat.mesReferencia;
      if (!acc[mes]) {
        acc[mes] = {
          mes,
          totalReciclado: 0,
          co2Economizado: 0,
          coletasRealizadas: 0,
        };
      }
      acc[mes].totalReciclado += stat.totalReciclado;
      acc[mes].co2Economizado += stat.co2Economizado;
      acc[mes].coletasRealizadas += stat.coletasRealizadas;
      return acc;
    }, {});

    return Object.values(estatisticasPorMes);
  }
}

