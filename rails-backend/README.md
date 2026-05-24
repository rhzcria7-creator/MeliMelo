# MeliMelo - Migração Profissional

Esta pasta contém a base arquitetural para a migração para **Ruby on Rails** e **PostgreSQL**.
A aplicação em produção final deve utilizar esta base para a API Backend.

## Estrutura
- `db/migrate`: Migrações da base de dados PostgreSQL.
- `app/controllers`: Controllers otimizados (Contacts, Partnerships, Songs).
- `config/routes.rb`: Gerenciamento das rotas da API.

## Funcionalidades
- **Google Forms API**: Integrado na rota de Partnerships (`submit_to_google_forms`).
- **Postgres**: Models mapeados via ActiveRecord usando UUID como PK para maior segurança e isolamento.
- **Segurança Hardcore**: `rack-attack` para rate-limiting e prevenção de brute-force.
- **Email Redirect**: Identifica a conta de email do usuário e direciona para a interface ideal do mail (Gmail Web, Outlook Web, ou Generic Default) com os dados pré-preenchidos.

---
> **Nota do AI Studio Preview:**
> O preview visual roda através de Node.js (Vite + Express). O código Express (`server.ts`) implementa **exatamente a mesma lógica, tabelas e fluxo de forms** em PostgreSQL para que o live-preview funcione corretamente para você. Quando for fazer o deploy do backend da empresa, use os arquivos Ruby disponibilizados nesta pasta `/rails-backend`.
