# Coleção Postman - EcoConnect API

## Importar no Postman

1. Abra o Postman
2. Clique em "Import"
3. Cole a URL: http://localhost:3000/api/docs-json
4. Ou importe este arquivo JSON

## Variáveis de Ambiente

Crie um environment no Postman com:

```json
{
  "baseUrl": "http://localhost:3000/api",
  "token": ""
}
```

## Fluxo de Teste Recomendado

### 1. Autenticação
```
POST {{baseUrl}}/auth/login
{
  "email": "cidadao@exemplo.com",
  "password": "123456"
}
```

Copie o `access_token` da resposta e cole na variável `token`.

### 2. Perfil do Usuário
```
GET {{baseUrl}}/users/profile
Authorization: Bearer {{token}}
```

### 3. Listar Materiais
```
GET {{baseUrl}}/materiais
```

### 4. Listar Pontos de Coleta
```
GET {{baseUrl}}/pontos-coleta
```

### 5. Criar Agendamento
```
POST {{baseUrl}}/agendamentos
Authorization: Bearer {{token}}
{
  "nome": "João Silva",
  "endereco": "Rua das Flores, 123",
  "telefone": "(11) 99999-9999",
  "data": "2024-12-25T10:00:00Z",
  "periodo": "MANHA",
  "materiais": ["MATERIAL_ID_AQUI"],
  "observacoes": "Teste via Postman"
}
```

### 6. Listar Agendamentos
```
GET {{baseUrl}}/agendamentos
Authorization: Bearer {{token}}
```

### 7. Estatísticas do Usuário
```
GET {{baseUrl}}/estatisticas/usuario
Authorization: Bearer {{token}}
```

### 8. Ranking de Usuários
```
GET {{baseUrl}}/estatisticas/ranking
```

### 9. Conteúdo Educativo
```
GET {{baseUrl}}/educacao
```

### 10. Cooperativas
```
GET {{baseUrl}}/cooperativas
```

## Headers Padrão

Para todas as requisições autenticadas:
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

## Códigos de Status

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `401` - Não autorizado
- `403` - Acesso negado
- `404` - Não encontrado
- `500` - Erro interno do servidor

