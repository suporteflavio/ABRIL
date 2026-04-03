# API Reference

## Base URL

```
http://localhost:3001/api/v1
```

## Autenticação

### POST /auth/login

Login com CPF e senha.

**Request:**
```json
{
  "cpf": "123.456.789-00",
  "password": "senha123",
  "tenantId": "tenant-cuid-aqui"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "userId": "user-cuid",
  "role": "STANDARD"
}
```

## Health Check

### GET /health

Verifica se o serviço está funcionando.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Tenants

### GET /tenants

Lista todos os tenants ativos.

### GET /tenants/:id

Retorna um tenant específico.

## Users

### GET /users/:tenantId

Lista usuários de um tenant.
