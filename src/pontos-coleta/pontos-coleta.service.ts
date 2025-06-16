import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class PontosColetaService {
  constructor(private prisma: PrismaService) {}

  async findAll(materialId?: string) {
    const where: any = {
      ativo: true,
    };

    if (materialId) {
      where.materiais = {
        some: {
          materialId,
        },
      };
    }

    return this.prisma.pontoColeta.findMany({
      where,
      include: {
        materiais: {
          include: {
            material: true,
          },
        },
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.pontoColeta.findUnique({
      where: { id },
      include: {
        materiais: {
          include: {
            material: true,
          },
        },
      },
    });
  }

  async findNearby(latitude: number, longitude: number, radius: number = 10) {
    // Implementação simplificada - em produção usaria PostGIS ou similar
    const pontos = await this.findAll();
    
    return pontos.filter(ponto => {
      if (!ponto.latitude || !ponto.longitude) return false;
      
      const distance = this.calculateDistance(
        latitude,
        longitude,
        ponto.latitude,
        ponto.longitude
      );
      
      return distance <= radius;
    });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distância em km
    return d;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

