import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class EducacaoService {
  constructor(private prisma: PrismaService) {}

  async findAll(tipo?: string, categoria?: string) {
    const where: any = {
      ativo: true,
    };

    if (tipo) {
      where.tipo = tipo;
    }

    if (categoria) {
      where.categoria = categoria;
    }

    return this.prisma.conteudoEducativo.findMany({
      where,
      orderBy: [
        { ordem: 'asc' },
        { titulo: 'asc' },
      ],
    });
  }

  async findOne(id: string) {
    return this.prisma.conteudoEducativo.findUnique({
      where: { id },
    });
  }

  async findByCategoria() {
    const conteudos = await this.prisma.conteudoEducativo.findMany({
      where: { ativo: true },
      orderBy: [
        { categoria: 'asc' },
        { ordem: 'asc' },
        { titulo: 'asc' },
      ],
    });

    // Agrupar por categoria
    const conteudosPorCategoria = conteudos.reduce((acc, conteudo) => {
      const categoria = conteudo.categoria || 'geral';
      if (!acc[categoria]) {
        acc[categoria] = [];
      }
      acc[categoria].push(conteudo);
      return acc;
    }, {});

    return conteudosPorCategoria;
  }

  async findByTipo() {
    const conteudos = await this.prisma.conteudoEducativo.findMany({
      where: { ativo: true },
      orderBy: [
        { tipo: 'asc' },
        { ordem: 'asc' },
        { titulo: 'asc' },
      ],
    });

    // Agrupar por tipo
    const conteudosPorTipo = conteudos.reduce((acc, conteudo) => {
      const tipo = conteudo.tipo;
      if (!acc[tipo]) {
        acc[tipo] = [];
      }
      acc[tipo].push(conteudo);
      return acc;
    }, {});

    return conteudosPorTipo;
  }
}

