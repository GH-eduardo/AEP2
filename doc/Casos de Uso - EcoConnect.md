# Casos de Uso - EcoConnect

## 1. Identificação dos Atores

### Ator Principal: Cidadão
**Descrição:** Pessoa física que utiliza a plataforma para agendar coletas, encontrar pontos de reciclagem e aprender sobre sustentabilidade.

### Ator Secundário: Cooperativa
**Descrição:** Organização responsável pela coleta de materiais recicláveis que utiliza a plataforma para gerenciar operações.

### Ator Secundário: Gestor Público
**Descrição:** Representante do poder público que monitora dados e implementa políticas de reciclagem.

## 2. Casos de Uso Detalhados

### UC01 - Agendar Coleta Domiciliar

**Ator Principal:** Cidadão  
**Objetivo:** Solicitar coleta de materiais recicláveis em sua residência  
**Pré-condições:** Usuário deve ter acesso à plataforma  
**Pós-condições:** Agendamento registrado no sistema  

**Fluxo Principal:**
1. Cidadão acessa a seção "Agendamento"
2. Sistema exibe formulário de agendamento
3. Cidadão preenche dados pessoais (nome, endereço, telefone)
4. Cidadão seleciona data e período desejado
5. Cidadão marca os tipos de materiais para coleta
6. Cidadão adiciona observações (opcional)
7. Cidadão clica em "Agendar Coleta"
8. Sistema valida os dados inseridos
9. Sistema registra o agendamento
10. Sistema exibe confirmação de sucesso
11. Sistema atualiza estatísticas do usuário

**Fluxos Alternativos:**
- **FA01:** Se dados obrigatórios não preenchidos
  - Sistema exibe mensagem de erro
  - Retorna ao passo 3
- **FA02:** Se nenhum material selecionado
  - Sistema exibe alerta
  - Retorna ao passo 5

**Fluxos de Exceção:**
- **FE01:** Erro no sistema
  - Sistema exibe mensagem de erro técnico
  - Sugere tentar novamente mais tarde

---

### UC02 - Localizar Pontos de Coleta

**Ator Principal:** Cidadão  
**Objetivo:** Encontrar pontos de coleta próximos à sua localização  
**Pré-condições:** Usuário deve ter acesso à plataforma  
**Pós-condições:** Lista de pontos exibida  

**Fluxo Principal:**
1. Cidadão acessa a seção "Mapa"
2. Sistema exibe mapa com pontos de coleta
3. Sistema lista pontos próximos
4. Cidadão visualiza informações dos pontos
5. Cidadão pode filtrar por tipo de material
6. Cidadão pode solicitar localização atual
7. Sistema atualiza lista baseada na localização
8. Cidadão pode clicar em "Como chegar"
9. Sistema abre navegação externa

**Fluxos Alternativos:**
- **FA01:** Se geolocalização negada
  - Sistema exibe todos os pontos
  - Continua fluxo normal
- **FA02:** Se filtro aplicado
  - Sistema filtra pontos por material
  - Exibe apenas pontos relevantes

---

### UC03 - Acessar Conteúdo Educativo

**Ator Principal:** Cidadão  
**Objetivo:** Aprender sobre práticas de reciclagem e sustentabilidade  
**Pré-condições:** Usuário deve ter acesso à plataforma  
**Pós-condições:** Conhecimento adquirido  

**Fluxo Principal:**
1. Cidadão acessa a seção "Educação"
2. Sistema exibe abas de conteúdo educativo
3. Cidadão seleciona aba desejada
4. Sistema exibe conteúdo correspondente
5. Cidadão lê informações sobre reciclagem
6. Cidadão pode navegar entre diferentes abas
7. Sistema mantém histórico de acesso

**Fluxos Alternativos:**
- **FA01:** Navegação entre abas
  - Sistema troca conteúdo dinamicamente
  - Mantém estado da navegação

---

### UC04 - Visualizar Dashboard Pessoal

**Ator Principal:** Cidadão  
**Objetivo:** Acompanhar estatísticas pessoais e impacto ambiental  
**Pré-condições:** Usuário deve ter dados no sistema  
**Pós-condições:** Estatísticas exibidas  

**Fluxo Principal:**
1. Cidadão acessa a seção "Dashboard"
2. Sistema carrega dados do usuário
3. Sistema exibe estatísticas pessoais
4. Sistema mostra histórico de coletas
5. Sistema exibe ranking da comunidade
6. Cidadão visualiza seu impacto ambiental
7. Sistema atualiza dados em tempo real

**Fluxos Alternativos:**
- **FA01:** Se usuário novo (sem dados)
  - Sistema exibe valores zerados
  - Sugere agendar primeira coleta

---

### UC05 - Gerenciar Rotas de Coleta (Cooperativa)

**Ator Principal:** Cooperativa  
**Objetivo:** Organizar e otimizar rotas de coleta  
**Pré-condições:** Cooperativa deve estar cadastrada  
**Pós-condições:** Rotas organizadas  

**Fluxo Principal:**
1. Cooperativa acessa painel administrativo
2. Sistema exibe agendamentos pendentes
3. Cooperativa visualiza localização dos agendamentos
4. Sistema sugere rotas otimizadas
5. Cooperativa confirma ou ajusta rotas
6. Sistema atualiza status dos agendamentos
7. Sistema notifica cidadãos sobre confirmação

**Fluxos Alternativos:**
- **FA01:** Ajuste manual de rotas
  - Cooperativa reorganiza sequência
  - Sistema recalcula otimização

---

### UC06 - Monitorar Dados de Reciclagem (Gestor Público)

**Ator Principal:** Gestor Público  
**Objetivo:** Acompanhar indicadores de reciclagem da região  
**Pré-condições:** Gestor deve ter acesso administrativo  
**Pós-condições:** Relatórios gerados  

**Fluxo Principal:**
1. Gestor acessa painel de monitoramento
2. Sistema exibe dashboard com indicadores
3. Gestor visualiza estatísticas regionais
4. Sistema gera relatórios de impacto
5. Gestor analisa tendências e padrões
6. Sistema permite exportação de dados
7. Gestor utiliza dados para políticas públicas

---

## 3. Matriz de Rastreabilidade

| Caso de Uso | Requisito Funcional | Prioridade | Status |
|-------------|-------------------|------------|--------|
| UC01 | RF01 - Agendamento de coletas | Alta | ✅ Implementado |
| UC02 | RF02 - Localização de pontos | Alta | ✅ Implementado |
| UC03 | RF03 - Conteúdo educativo | Média | ✅ Implementado |
| UC04 | RF04 - Dashboard pessoal | Média | ✅ Implementado |
| UC05 | RF05 - Gestão de rotas | Baixa | 🔄 Futuro |
| UC06 | RF06 - Monitoramento público | Baixa | 🔄 Futuro |

## 4. Regras de Negócio

### RN01 - Validação de Agendamento
- Data de coleta deve ser futura
- Pelo menos um material deve ser selecionado
- Todos os campos obrigatórios devem ser preenchidos

### RN02 - Cálculo de Pontuação
- 10 pontos por kg de material reciclado
- Bônus de 50 pontos para primeira coleta
- Pontuação dobrada em campanhas especiais

### RN03 - Atualização de Estatísticas
- Estatísticas atualizadas após confirmação de coleta
- CO₂ economizado = peso reciclado × 0.5
- Impacto calculado automaticamente

### RN04 - Filtros de Pontos de Coleta
- Filtros aplicados em tempo real
- Distância calculada por geolocalização
- Horários de funcionamento considerados

## 5. Cenários de Teste

### CT01 - Agendamento Bem-sucedido
**Dado:** Usuário na página de agendamento  
**Quando:** Preenche todos os dados corretamente  
**Então:** Agendamento é registrado com sucesso  

### CT02 - Agendamento com Erro
**Dado:** Usuário na página de agendamento  
**Quando:** Não seleciona nenhum material  
**Então:** Sistema exibe mensagem de erro  

### CT03 - Busca de Pontos
**Dado:** Usuário na página do mapa  
**Quando:** Aplica filtro por material  
**Então:** Lista é filtrada corretamente  

### CT04 - Dashboard Inicial
**Dado:** Usuário novo no sistema  
**Quando:** Acessa dashboard  
**Então:** Estatísticas zeradas são exibidas  

---

Este documento define os casos de uso principais da plataforma EcoConnect, servindo como base para desenvolvimento, testes e validação do sistema.

