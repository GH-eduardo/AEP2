# Front-End EcoConnect - Plataforma de Reciclagem

## Descrição
Plataforma digital que conecta cidadãos, cooperativas e gestores públicos no processo de reciclagem, facilitando a comunicação e eficácia nas operações de coleta.

## Obs: Termo de abertura e Casos de uso disponíveis na pasta 'doc'

## Funcionalidades

### Para Cidadãos:
- ✅ Visualização de pontos de coleta próximos
- ✅ Agendamento de coletas domiciliares
- ✅ Sistema de educação ambiental
- ✅ Dashboard pessoal com estatísticas
- ✅ Sistema de pontuação/gamificação
- ✅ Mapa interativo de pontos de reciclagem

### Para Cooperativas:
- 🔄 Gerenciamento de rotas de coleta
- 🔄 Cadastro de materiais aceitos
- 🔄 Dashboard de estatísticas
- 🔄 Comunicação com cidadãos

### Para Gestores Públicos:
- 🔄 Monitoramento de dados de reciclagem
- 🔄 Relatórios de impacto ambiental
- 🔄 Gestão de políticas públicas

## Tecnologias Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Armazenamento**: LocalStorage
- **APIs**: Geolocalização
- **Design**: Responsivo (Mobile-first)
- **Ícones**: Font Awesome

## Estrutura do Projeto
```
plataforma-reciclagem/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos da aplicação
├── js/
│   └── script.js       # Funcionalidades JavaScript
├── images/             # Imagens e assets
└── README.md           # Documentação
```

## Como Executar
1. Clone ou baixe os arquivos do projeto
2. Abra o arquivo `index.html` em um navegador web
3. A aplicação estará pronta para uso

## Funcionalidades Implementadas

### 1. Navegação
- Menu responsivo com toggle mobile
- Navegação entre seções via JavaScript
- Links ativos destacados

### 2. Mapa de Pontos de Coleta
- Lista de pontos de coleta simulados
- Filtro por tipo de material
- Integração com Google Maps para rotas
- Geolocalização do usuário

### 3. Agendamento de Coletas
- Formulário completo de agendamento
- Validação de dados
- Seleção múltipla de materiais
- Persistência em LocalStorage

### 4. Educação Ambiental
- Dicas de reciclagem por material
- Guia de separação de resíduos
- Estatísticas de impacto ambiental
- Interface com abas interativas

### 5. Dashboard Pessoal
- Estatísticas do usuário
- Histórico de coletas
- Sistema de pontuação
- Ranking da comunidade

### 6. Sistema de Notificações
- Feedback visual para ações
- Diferentes tipos de notificação
- Animações suaves

## Dados Simulados
A aplicação utiliza dados simulados para demonstração:
- 3 pontos de coleta com diferentes materiais
- Sistema de estatísticas pessoais
- Ranking da comunidade
- Histórico de agendamentos

## Persistência de Dados
- Agendamentos salvos em LocalStorage
- Estatísticas do usuário persistidas
- Dados mantidos entre sessões

## Design Responsivo
- Layout adaptável para desktop, tablet e mobile
- Menu mobile com hamburger
- Grid responsivo para cards e seções
- Tipografia escalável

---

**EcoConnect** - Conectando comunidades para um futuro sustentável 🌱

# Back-End - EcoConnect API

## Descrição
API REST desenvolvida em NestJS para a plataforma de reciclagem EcoConnect. Esta API fornece endpoints para gerenciamento de usuários, agendamentos de coleta, pontos de coleta, materiais recicláveis, estatísticas e conteúdo educativo.

## Tecnologias Utilizadas

### Core
- **NestJS** - Framework Node.js para construção de APIs escaláveis
- **TypeScript** - Linguagem de programação tipada
- **Prisma** - ORM moderno para TypeScript e Node.js
- **PostgreSQL** - Banco de dados relacional

### Documentação e Validação
- **Swagger/OpenAPI** - Documentação automática da API
- **class-validator** - Validação de dados
- **class-transformer** - Transformação de objetos

### DevOps
- **Docker** - Containerização da aplicação
- **Docker Compose** - Orquestração de containers

## Estrutura do Projeto

```
src/
├── users/               # Módulo de usuários
├── agendamentos/        # Módulo de agendamentos
├── pontos-coleta/       # Módulo de pontos de coleta
├── materiais/           # Módulo de materiais
├── estatisticas/        # Módulo de estatísticas
├── educacao/            # Módulo de educação
├── cooperativas/        # Módulo de cooperativas
├── common/              # Módulos compartilhados
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── app.module.ts        # Módulo principal
└── main.ts              # Arquivo de entrada
```

## Banco de Dados

### Modelos Principais
- **User** - Usuários do sistema (cidadãos, cooperativas, admins)
- **PontoColeta** - Pontos de coleta de materiais
- **Material** - Tipos de materiais recicláveis
- **Agendamento** - Solicitações de coleta
- **Estatistica** - Dados de reciclagem dos usuários
- **Cooperativa** - Cooperativas de reciclagem
- **ConteudoEducativo** - Material educativo sobre reciclagem

### Relacionamentos
- Usuários podem ter múltiplos agendamentos
- Agendamentos podem ter múltiplos materiais
- Pontos de coleta aceitam múltiplos materiais
- Estatísticas são agrupadas por usuário e mês

## Endpoints da API

### Usuários (`/api/users`)
- `GET /profile` - Perfil do usuário autenticado
- `PATCH /profile` - Atualizar perfil

### Agendamentos (`/api/agendamentos`)
- `POST /` - Criar novo agendamento
- `GET /` - Listar agendamentos
- `GET /:id` - Buscar agendamento por ID
- `PATCH /:id` - Atualizar agendamento
- `DELETE /:id` - Cancelar agendamento

### Pontos de Coleta (`/api/pontos-coleta`)
- `GET /` - Listar pontos de coleta
- `GET /nearby` - Buscar pontos próximos
- `GET /:id` - Buscar ponto por ID

### Materiais (`/api/materiais`)
- `GET /` - Listar materiais
- `GET /:id` - Buscar material por ID

### Estatísticas (`/api/estatisticas`)
- `GET /usuario` - Estatísticas do usuário
- `GET /ranking` - Ranking de usuários
- `GET /gerais` - Estatísticas gerais
- `GET /periodo` - Estatísticas por período

### Educação (`/api/educacao`)
- `GET /` - Listar conteúdo educativo
- `GET /categorias` - Conteúdo por categoria
- `GET /tipos` - Conteúdo por tipo
- `GET /:id` - Buscar conteúdo por ID

### Cooperativas (`/api/cooperativas`)
- `GET /` - Listar cooperativas
- `GET /:id` - Buscar cooperativa por ID

## Configuração e Instalação

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (se não usar Docker)

### Instalação Local

1. **Clone o repositório**
```bash
git clone <repository-url>
cd ecoconnect-api
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Execute as migrações do banco**
```bash
npx prisma migrate dev
```

5. **Popule o banco com dados iniciais**
```bash
npx prisma db seed
```

6. **Inicie a aplicação**
```bash
npm run start:dev
```

### Usando Docker

#### Desenvolvimento
```bash
# Iniciar em modo desenvolvimento
npm run docker:dev

# Ou diretamente com docker-compose
docker-compose -f docker-compose.dev.yml up --build
```

#### Produção
```bash
# Iniciar em modo produção
npm run docker:prod

# Ou diretamente com docker-compose
docker-compose up --build -d
```

## Variáveis de Ambiente

```env
# Banco de dados
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecoconnect?schema=public"

# JWT
JWT_SECRET="ecoconnect-jwt-secret-key-2024"
JWT_EXPIRES_IN="7d"

# Servidor
PORT=3000
```

## Documentação da API

A documentação completa da API está disponível via Swagger:

- **Desenvolvimento**: http://localhost:3000/api/docs
- **Produção**: https://your-domain.com/api/docs

### Características do Swagger
- Documentação automática de todos os endpoints
- Schemas de request/response
- Possibilidade de testar endpoints diretamente
- Organização por tags (módulos)
- Ordenação personalizada (POST → GET → PATCH → DELETE)

## Dados de Teste

O sistema inclui dados de teste que são inseridos automaticamente:

### Usuários
- **Admin**: admin@ecoconnect.com / admin123
- **Cidadão**: cidadao@exemplo.com / 123456

### Materiais
- Papel, Plástico, Vidro, Metal, Eletrônicos

### Pontos de Coleta
- Cooperativa Verde Vida
- Ecoponto Municipal  
- Recicla Mais

## Monitoramento

### Logs
A aplicação gera logs estruturados para monitoramento:
- Requisições HTTP
- Erros de aplicação
- Operações do banco de dados

### Health Check
- Endpoint: `GET /api/health`
- Verifica conectividade com banco de dados

### Métricas
- Tempo de resposta das APIs
- Número de usuários ativos
- Estatísticas de reciclagem

## Performance

### Otimizações Implementadas
- Conexão pool do Prisma
- Índices no banco de dados
- Paginação em endpoints de listagem

### Monitoramento de Performance
- Tempo de resposta das APIs
- Uso de memória e CPU
- Conexões ativas do banco

## Deployment

### Docker
A aplicação está pronta para deployment com Docker:

```bash
# Build da imagem
docker build -t ecoconnect-api .

# Executar container
docker run -p 3000:3000 ecoconnect-api
```

### Variáveis de Ambiente para Produção
```env
NODE_ENV=production
DATABASE_URL=<production-database-url>
JWT_SECRET=<strong-secret-key>
PORT=3000
```
---

**EcoConnect API** - Conectando tecnologia e sustentabilidade 🌱