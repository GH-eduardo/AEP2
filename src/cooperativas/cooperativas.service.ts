import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class CooperativasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.cooperativa.findMany({
      where: { ativa: true },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.cooperativa.findUnique({
      where: { id },
    });
  }
}

