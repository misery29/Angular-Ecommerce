# Festival App – Como Rodar

Esse projeto é um e-commerce feito com Angular (frontend) e NestJS/Prisma (backend), usando PostgreSQL e Redis. Tudo roda em containers Docker, então não precisa instalar nada além do Docker.

## O que você vai precisar

- Docker instalado e rodando.

---

## Subindo tudo de uma vez

1. Abre o terminal na pasta do projeto.
2. Roda:
   ```bash
   ./start-festival.sh
   ```

---

## Onde acessar

- **Frontend:** [http://localhost:4200](http://localhost:4200)
- **Backend (API):** [http://localhost:3000](http://localhost:3000)
- **Banco de Dados:** localhost:5432 (PostgreSQL)
- **Redis:** localhost:6379

Se quiser ver os logs rolando:
```bash
docker-compose logs -f
```
Para desligar tudo:
```bash
docker-compose down
```

---

## Variáveis de ambiente (importante!)

O backend precisa de algumas variáveis pra funcionar:
- `DATABASE_URL` (já vem do docker-compose)
- `JWT_SECRET` (define um segredo pra autenticação)
- `REDIS_HOST` e `REDIS_PORT` (pra cache e sessões)

No Docker, o docker-compose já define o básico, mas **você precisa garantir que todas as variáveis estejam lá**. Exemplo de como deve ficar o bloco do backend no `docker-compose.yml`:

```yaml
  backend:
    # ...
    environment:
      DATABASE_URL: postgresql://dev:dev@postgres:5432/festival
      JWT_SECRET: segredinnnn
      REDIS_HOST: redis
      REDIS_PORT: 6379
```

Se faltar alguma variável, o backend pode não funcionar direito!

---

## Usuário Admin para Teste

Já tem um admin criado no banco:
- **Email:** admin@admin.com
- **Senha:** Admin123

---

## Por que desse jeito?

- **Docker:** Pra não ter dor de cabeça com dependência, versão de Node, banco, nada. Sobe igual pra todo mundo.
- **Script start-festival.sh:** Um comando só, sem precisar decorar docker-compose.
- **Angular + NestJS:** Fácil de manter, separar as coisas e escalar depois. Angular é ótimo pra interface, NestJS deixa o backend organizado.
- **Prisma:** Ajuda a mexer no banco sem ficar escrevendo Query.
- **Redis:** Usado pra gerenciamento de tokens e sessões, melhora performance.

---

## Dicas

- Se der erro, confere se o Docker está aberto.
- Se quiser resetar tudo, pode rodar o script de novo e escolher limpar as imagens.

---

Qualquer dúvida, só chamar! 