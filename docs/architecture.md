# Arquitetura do ABRIL

## Visão Geral

O ABRIL é um sistema SaaS multi-tenant para gestão de campanhas eleitorais construído como um monorepo com Turborepo.

## Stack Tecnológica

- **Backend**: NestJS + Express (Node.js)
- **Frontend**: Next.js 14 com App Router + React
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: JWT + login baseado em CPF
- **Arquitetura**: Multi-tenant com Row Level Security (RLS)
- **PWA**: Progressive Web App
- **Deploy**: Docker + Railway
- **Monorepo**: Turborepo + pnpm

## Estrutura do Monorepo

```
ABRIL/
├── apps/
│   ├── backend/          # API NestJS
│   └── web/              # Frontend Next.js
├── packages/
│   ├── shared/           # Tipos e utilitários compartilhados
│   └── config/           # Configurações compartilhadas
├── docs/                 # Documentação
└── scripts/              # Scripts SQL e utilitários
```

## Multi-tenancy e RLS

Cada tenant (organização) tem seus dados isolados via PostgreSQL Row Level Security (RLS).
Ao fazer uma requisição, o middleware define `app.current_tenant` na sessão do banco.
As políticas RLS filtram automaticamente todos os dados pelo tenant corrente.

Usuários com papel `ROOT` têm acesso a todos os dados via políticas específicas de ROOT.

## Modelos de Dados

- **Tenant**: Organização que usa o sistema
- **User**: Usuário vinculado a um tenant
- **Subscription**: Assinatura do tenant
- **Leader**: Líder de campanha
- **Meeting**: Reunião/evento
- **Attendee**: Participante de reunião
- **FuelVoucher**: Vale combustível para líderes
- **Transaction**: Transação financeira
- **AuditLog**: Log de auditoria
- **SocialStat**: Estatísticas de redes sociais
