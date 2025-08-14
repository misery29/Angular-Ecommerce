# Festival App – Como Rodar
<img width="1834" height="936" alt="image" src="https://github.com/user-attachments/assets/df7097c3-8803-4809-9664-5db9b7577527" />

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
## Usuário Admin para Teste

Já tem um admin criado no banco:
- **Email:** admin@admin.com
- **Senha:** Admin123

---

Qualquer dúvida, só chamar! 
