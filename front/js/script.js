// Dados simulados para a aplicação
const dadosSimulados = {
    pontosColeta: [
        {
            id: 1,
            nome: "Cooperativa Verde Vida",
            endereco: "Rua das Flores, 123 - Centro",
            materiais: ["papel", "plastico", "vidro"],
            horario: "8h às 17h",
            telefone: "(11) 1234-5678",
            distancia: "0.5 km"
        },
        {
            id: 2,
            nome: "Ecoponto Municipal",
            endereco: "Av. Principal, 456 - Jardim Verde",
            materiais: ["papel", "plastico", "vidro", "metal", "eletronicos"],
            horario: "24h",
            telefone: "(11) 8765-4321",
            distancia: "1.2 km"
        },
        {
            id: 3,
            nome: "Recicla Mais",
            endereco: "Rua da Sustentabilidade, 789 - Eco Bairro",
            materiais: ["plastico", "metal"],
            horario: "7h às 18h",
            telefone: "(11) 5555-9999",
            distancia: "2.1 km"
        }
    ],
    
    agendamentos: JSON.parse(localStorage.getItem('agendamentos')) || [],
    
    estatisticasUsuario: JSON.parse(localStorage.getItem('estatisticas')) || {
        totalReciclado: 0,
        coletasRealizadas: 0,
        co2Economizado: 0,
        pontosUsuario: 0
    }
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
    configurarEventos();
    atualizarDashboard();
});

// Função principal de inicialização
function inicializarApp() {
    // Configurar navegação
    configurarNavegacao();
    
    // Mostrar seção inicial
    showSection('home');
    
    // Configurar data mínima para agendamento
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('data').setAttribute('min', hoje);
    
    // Carregar pontos de coleta
    carregarPontosColeta();
}

// Configuração de eventos
function configurarEventos() {
    // Menu mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Formulário de agendamento
    const formAgendamento = document.getElementById('agendamento-form');
    formAgendamento.addEventListener('submit', processarAgendamento);
    
    // Filtro de materiais no mapa
    const filtroMaterial = document.getElementById('material-filter');
    filtroMaterial.addEventListener('change', filtrarPontosPorMaterial);
}

// Configuração da navegação
function configurarNavegacao() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            
            // Atualizar link ativo
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Fechar menu mobile
            document.querySelector('.nav-menu').classList.remove('active');
        });
    });
}

// Função para mostrar seções
function showSection(sectionId) {
    // Esconder todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Atualizar navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Carregar pontos de coleta
function carregarPontosColeta() {
    const container = document.getElementById('pontos-container');
    container.innerHTML = '';
    
    dadosSimulados.pontosColeta.forEach(ponto => {
        const pontoElement = criarElementoPonto(ponto);
        container.appendChild(pontoElement);
    });
}

// Criar elemento de ponto de coleta
function criarElementoPonto(ponto) {
    const div = document.createElement('div');
    div.className = 'ponto-coleta';
    div.style.cssText = `
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        border-left: 4px solid #4a7c59;
    `;
    
    const materiaisIcons = {
        papel: 'fas fa-newspaper',
        plastico: 'fas fa-bottle-water',
        vidro: 'fas fa-wine-glass',
        metal: 'fas fa-cog',
        eletronicos: 'fas fa-laptop'
    };
    
    const materiaisHtml = ponto.materiais.map(material => 
        `<span style="display: inline-flex; align-items: center; margin-right: 1rem; color: #4a7c59;">
            <i class="${materiaisIcons[material]}" style="margin-right: 0.5rem;"></i>
            ${material.charAt(0).toUpperCase() + material.slice(1)}
        </span>`
    ).join('');
    
    div.innerHTML = `
        <h4 style="color: #2d5a27; margin-bottom: 0.5rem;">${ponto.nome}</h4>
        <p style="color: #666; margin-bottom: 0.5rem;">
            <i class="fas fa-map-marker-alt" style="color: #4a7c59; margin-right: 0.5rem;"></i>
            ${ponto.endereco}
        </p>
        <p style="color: #666; margin-bottom: 0.5rem;">
            <i class="fas fa-clock" style="color: #4a7c59; margin-right: 0.5rem;"></i>
            ${ponto.horario}
        </p>
        <p style="color: #666; margin-bottom: 1rem;">
            <i class="fas fa-phone" style="color: #4a7c59; margin-right: 0.5rem;"></i>
            ${ponto.telefone} • ${ponto.distancia}
        </p>
        <div style="margin-bottom: 1rem;">
            <strong style="color: #2d5a27;">Materiais aceitos:</strong><br>
            <div style="margin-top: 0.5rem;">
                ${materiaisHtml}
            </div>
        </div>
        <button onclick="abrirRota(${ponto.id})" class="btn btn-primary" style="font-size: 0.9rem; padding: 0.5rem 1rem;">
            <i class="fas fa-route"></i> Como chegar
        </button>
    `;
    
    return div;
}

// Filtrar pontos por material
function filtrarPontosPorMaterial() {
    const filtro = document.getElementById('material-filter').value;
    const container = document.getElementById('pontos-container');
    container.innerHTML = '';
    
    const pontosFiltrados = filtro 
        ? dadosSimulados.pontosColeta.filter(ponto => ponto.materiais.includes(filtro))
        : dadosSimulados.pontosColeta;
    
    pontosFiltrados.forEach(ponto => {
        const pontoElement = criarElementoPonto(ponto);
        container.appendChild(pontoElement);
    });
    
    if (pontosFiltrados.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Nenhum ponto encontrado para este material.</p>';
    }
}

// Buscar localização do usuário
function buscarLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                mostrarNotificacao('Localização encontrada! Mostrando pontos próximos.', 'success');
                // Aqui seria implementada a lógica real de geolocalização
                carregarPontosColeta();
            },
            function(error) {
                mostrarNotificacao('Não foi possível obter sua localização. Mostrando todos os pontos.', 'warning');
                carregarPontosColeta();
            }
        );
    } else {
        mostrarNotificacao('Geolocalização não é suportada neste navegador.', 'error');
    }
}

// Abrir rota para ponto de coleta
function abrirRota(pontoId) {
    const ponto = dadosSimulados.pontosColeta.find(p => p.id === pontoId);
    if (ponto) {
        const endereco = encodeURIComponent(ponto.endereco);
        const url = `https://www.google.com/maps/search/${endereco}`;
        window.open(url, '_blank');
    }
}

// Processar agendamento
function processarAgendamento(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const materiais = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    
    if (materiais.length === 0) {
        mostrarNotificacao('Selecione pelo menos um material para coleta.', 'error');
        return;
    }
    
    const agendamento = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        endereco: document.getElementById('endereco').value,
        telefone: document.getElementById('telefone').value,
        data: document.getElementById('data').value,
        periodo: document.getElementById('periodo').value,
        materiais: materiais,
        observacoes: document.getElementById('observacoes').value,
        status: 'agendado',
        dataAgendamento: new Date().toISOString()
    };
    
    // Salvar agendamento
    dadosSimulados.agendamentos.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(dadosSimulados.agendamentos));
    
    // Atualizar estatísticas
    atualizarEstatisticas(materiais.length * 2); // 2kg por material estimado
    
    // Limpar formulário
    e.target.reset();
    
    // Mostrar confirmação
    mostrarNotificacao('Coleta agendada com sucesso! Você receberá uma confirmação em breve.', 'success');
    
    // Ir para dashboard
    setTimeout(() => {
        showSection('dashboard');
    }, 2000);
}

// Atualizar estatísticas do usuário
function atualizarEstatisticas(pesoEstimado) {
    dadosSimulados.estatisticasUsuario.totalReciclado += pesoEstimado;
    dadosSimulados.estatisticasUsuario.coletasRealizadas += 1;
    dadosSimulados.estatisticasUsuario.co2Economizado += pesoEstimado * 0.5; // 0.5kg CO2 por kg reciclado
    dadosSimulados.estatisticasUsuario.pontosUsuario += pesoEstimado * 10; // 10 pontos por kg
    
    localStorage.setItem('estatisticas', JSON.stringify(dadosSimulados.estatisticasUsuario));
    atualizarDashboard();
}

// Atualizar dashboard
function atualizarDashboard() {
    const stats = dadosSimulados.estatisticasUsuario;
    
    document.getElementById('total-reciclado').textContent = `${stats.totalReciclado} kg`;
    document.getElementById('coletas-realizadas').textContent = stats.coletasRealizadas;
    document.getElementById('co2-economizado').textContent = `${stats.co2Economizado.toFixed(1)} kg`;
    document.getElementById('pontos-usuario').textContent = stats.pontosUsuario;
    
    // Atualizar histórico
    atualizarHistoricoColetas();
    
    // Atualizar posição no ranking
    atualizarRanking();
}

// Atualizar histórico de coletas
function atualizarHistoricoColetas() {
    const container = document.getElementById('historico-lista');
    
    if (dadosSimulados.agendamentos.length === 0) {
        container.innerHTML = '<p class="no-data">Nenhuma coleta realizada ainda. <a href="#" onclick="showSection(\'agendamento\')">Agende sua primeira coleta!</a></p>';
        return;
    }
    
    container.innerHTML = '';
    
    dadosSimulados.agendamentos.slice(-5).reverse().forEach(agendamento => {
        const div = document.createElement('div');
        div.style.cssText = `
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border-left: 4px solid #4a7c59;
        `;
        
        const dataFormatada = new Date(agendamento.data).toLocaleDateString('pt-BR');
        
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <strong style="color: #2d5a27;">Coleta - ${dataFormatada}</strong>
                <span style="background: #4a7c59; color: white; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">
                    ${agendamento.status}
                </span>
            </div>
            <p style="color: #666; margin-bottom: 0.5rem;">
                <i class="fas fa-map-marker-alt" style="margin-right: 0.5rem;"></i>
                ${agendamento.endereco}
            </p>
            <p style="color: #666;">
                <strong>Materiais:</strong> ${agendamento.materiais.join(', ')}
            </p>
        `;
        
        container.appendChild(div);
    });
}

// Atualizar ranking
function atualizarRanking() {
    const rankingItem = document.querySelector('.ranking-item.destaque .pontos');
    if (rankingItem) {
        rankingItem.textContent = `${dadosSimulados.estatisticasUsuario.pontosUsuario} pts`;
    }
}

// Funções para as abas de educação
function showTab(tabId) {
    // Esconder todas as abas
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Mostrar aba selecionada
    document.getElementById(tabId).classList.add('active');
    
    // Atualizar botões das abas
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    event.target.classList.add('active');
}

// Sistema de notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Remover notificação existente
    const notificacaoExistente = document.querySelector('.notificacao');
    if (notificacaoExistente) {
        notificacaoExistente.remove();
    }
    
    // Criar nova notificação
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    
    const cores = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    notificacao.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${cores[tipo]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    notificacao.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : tipo === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${mensagem}</span>
        </div>
    `;
    
    // Adicionar CSS da animação se não existir
    if (!document.querySelector('#notificacao-styles')) {
        const style = document.createElement('style');
        style.id = 'notificacao-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notificacao);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (notificacao.parentNode) {
            notificacao.remove();
        }
    }, 5000);
}

// Função para simular dados em tempo real
function simularDadosTempoReal() {
    setInterval(() => {
        // Simular novas coletas na comunidade
        const estatisticasComunidade = document.querySelectorAll('.stat-number');
        if (estatisticasComunidade.length > 0) {
            // Pequenos incrementos aleatórios para simular atividade
            if (Math.random() > 0.8) {
                const incremento = Math.floor(Math.random() * 3) + 1;
                // Atualizar alguma estatística da comunidade
            }
        }
    }, 30000); // A cada 30 segundos
}

// Inicializar simulação de dados em tempo real
simularDadosTempoReal();

// Função para exportar dados (funcionalidade adicional)
function exportarDados() {
    const dados = {
        agendamentos: dadosSimulados.agendamentos,
        estatisticas: dadosSimulados.estatisticasUsuario,
        dataExportacao: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecoconnect-dados-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    mostrarNotificacao('Dados exportados com sucesso!', 'success');
}

// Função para limpar dados (para demonstração)
function limparDados() {
    if (confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('agendamentos');
        localStorage.removeItem('estatisticas');
        
        dadosSimulados.agendamentos = [];
        dadosSimulados.estatisticasUsuario = {
            totalReciclado: 0,
            coletasRealizadas: 0,
            co2Economizado: 0,
            pontosUsuario: 0
        };
        
        atualizarDashboard();
        mostrarNotificacao('Dados limpos com sucesso!', 'success');
    }
}

// Adicionar funcionalidades de desenvolvedor (apenas para demonstração)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Adicionar botões de desenvolvedor
    window.addEventListener('load', () => {
        const devPanel = document.createElement('div');
        devPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            font-size: 0.8rem;
            z-index: 9999;
        `;
        
        devPanel.innerHTML = `
            <div style="margin-bottom: 0.5rem;"><strong>Painel do Desenvolvedor</strong></div>
            <button onclick="exportarDados()" style="margin-right: 0.5rem; padding: 0.3rem 0.6rem; font-size: 0.7rem;">Exportar Dados</button>
            <button onclick="limparDados()" style="padding: 0.3rem 0.6rem; font-size: 0.7rem;">Limpar Dados</button>
        `;
        
        document.body.appendChild(devPanel);
    });
}

