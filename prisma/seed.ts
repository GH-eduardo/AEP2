import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar materiais
  const materiais = await Promise.all([
    prisma.material.upsert({
      where: { nome: 'Papel' },
      update: {},
      create: {
        nome: 'Papel',
        descricao: 'Jornais, revistas, papelão, papel de escritório',
        icone: 'fas fa-newspaper',
        cor: '#007bff',
      },
    }),
    prisma.material.upsert({
      where: { nome: 'Plástico' },
      update: {},
      create: {
        nome: 'Plástico',
        descricao: 'Garrafas PET, embalagens, sacolas plásticas',
        icone: 'fas fa-bottle-water',
        cor: '#dc3545',
      },
    }),
    prisma.material.upsert({
      where: { nome: 'Vidro' },
      update: {},
      create: {
        nome: 'Vidro',
        descricao: 'Garrafas, potes, frascos de vidro',
        icone: 'fas fa-wine-glass',
        cor: '#28a745',
      },
    }),
    prisma.material.upsert({
      where: { nome: 'Metal' },
      update: {},
      create: {
        nome: 'Metal',
        descricao: 'Latas de alumínio, ferro, cobre',
        icone: 'fas fa-cog',
        cor: '#ffc107',
      },
    }),
    prisma.material.upsert({
      where: { nome: 'Eletrônicos' },
      update: {},
      create: {
        nome: 'Eletrônicos',
        descricao: 'Celulares, computadores, pilhas, baterias',
        icone: 'fas fa-laptop',
        cor: '#6f42c1',
      },
    }),
  ]);

  console.log('✅ Materiais criados:', materiais.length);

  // Criar pontos de coleta
  const pontosColeta = await Promise.all([
    prisma.pontoColeta.create({
      data: {
        nome: 'Cooperativa Verde Vida',
        endereco: 'Rua das Flores, 123 - Centro',
        telefone: '(11) 1234-5678',
        horario: '8h às 17h',
        latitude: -23.5505,
        longitude: -46.6333,
        materiais: {
          create: [
            { materialId: materiais[0].id }, // Papel
            { materialId: materiais[1].id }, // Plástico
            { materialId: materiais[2].id }, // Vidro
          ],
        },
      },
    }),
    prisma.pontoColeta.create({
      data: {
        nome: 'Ecoponto Municipal',
        endereco: 'Av. Principal, 456 - Jardim Verde',
        telefone: '(11) 8765-4321',
        horario: '24h',
        latitude: -23.5489,
        longitude: -46.6388,
        materiais: {
          create: [
            { materialId: materiais[0].id }, // Papel
            { materialId: materiais[1].id }, // Plástico
            { materialId: materiais[2].id }, // Vidro
            { materialId: materiais[3].id }, // Metal
            { materialId: materiais[4].id }, // Eletrônicos
          ],
        },
      },
    }),
    prisma.pontoColeta.create({
      data: {
        nome: 'Recicla Mais',
        endereco: 'Rua da Sustentabilidade, 789 - Eco Bairro',
        telefone: '(11) 5555-9999',
        horario: '7h às 18h',
        latitude: -23.5577,
        longitude: -46.6395,
        materiais: {
          create: [
            { materialId: materiais[1].id }, // Plástico
            { materialId: materiais[3].id }, // Metal
          ],
        },
      },
    }),
  ]);

  console.log('✅ Pontos de coleta criados:', pontosColeta.length);

  // Criar usuário administrador
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ecoconnect.com' },
    update: {},
    create: {
      email: 'admin@ecoconnect.com',
      name: 'Administrador EcoConnect',
      password: hashedPassword,
      role: 'ADMIN',
      phone: '(11) 9999-0000',
      address: 'Sede EcoConnect',
      points: 0,
    },
  });

  console.log('✅ Usuário administrador criado:', adminUser.email);

  // Criar usuário cidadão de exemplo
  const citizenPassword = await bcrypt.hash('123456', 10);
  const citizenUser = await prisma.user.upsert({
    where: { email: 'cidadao@exemplo.com' },
    update: {},
    create: {
      email: 'cidadao@exemplo.com',
      name: 'João Silva',
      password: citizenPassword,
      role: 'CITIZEN',
      phone: '(11) 9876-5432',
      address: 'Rua das Palmeiras, 456 - Vila Verde',
      points: 150,
    },
  });

  console.log('✅ Usuário cidadão criado:', citizenUser.email);

  // Criar cooperativas
  const cooperativas = await Promise.all([
    prisma.cooperativa.create({
      data: {
        nome: 'Cooperativa Verde Vida',
        cnpj: '12.345.678/0001-90',
        endereco: 'Rua das Flores, 123 - Centro',
        telefone: '(11) 1234-5678',
        email: 'contato@verdevida.com',
        responsavel: 'Maria Santos',
      },
    }),
    prisma.cooperativa.create({
      data: {
        nome: 'Recicla Mais Cooperativa',
        cnpj: '98.765.432/0001-10',
        endereco: 'Rua da Sustentabilidade, 789 - Eco Bairro',
        telefone: '(11) 5555-9999',
        email: 'contato@reciclamais.com',
        responsavel: 'Carlos Oliveira',
      },
    }),
  ]);

  console.log('✅ Cooperativas criadas:', cooperativas.length);

  // Criar conteúdo educativo
  const conteudoEducativo = await Promise.all([
    prisma.conteudoEducativo.create({
      data: {
        titulo: 'Como separar papel corretamente',
        conteudo: 'Remova grampos e fitas adesivas antes de descartar. Papel molhado não é reciclável.',
        tipo: 'DICA',
        categoria: 'papel',
        ordem: 1,
      },
    }),
    prisma.conteudoEducativo.create({
      data: {
        titulo: 'Reciclagem de plástico',
        conteudo: 'Lave as embalagens para remover restos de comida. Verifique o símbolo de reciclagem.',
        tipo: 'DICA',
        categoria: 'plastico',
        ordem: 2,
      },
    }),
    prisma.conteudoEducativo.create({
      data: {
        titulo: 'Guia completo de separação de resíduos',
        conteudo: 'Azul para papel, vermelho para plástico, verde para vidro, amarelo para metal, marrom para orgânico.',
        tipo: 'GUIA',
        categoria: 'geral',
        ordem: 1,
      },
    }),
  ]);

  console.log('✅ Conteúdo educativo criado:', conteudoEducativo.length);

  // Criar estatísticas para o usuário cidadão
  const mesAtual = new Date().toISOString().slice(0, 7); // YYYY-MM
  await prisma.estatistica.create({
    data: {
      userId: citizenUser.id,
      totalReciclado: 25.5,
      co2Economizado: 12.75,
      coletasRealizadas: 3,
      mesReferencia: mesAtual,
    },
  });

  console.log('✅ Estatísticas criadas para o usuário');

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

