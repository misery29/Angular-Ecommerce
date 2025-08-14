# Festival App – Como Rodar

<img width="1834" height="936" alt="image" src="https://github.com/user-attachments/assets/df7097c3-8803-4809-9664-5db9b7577527" />

E-commerce desenvolvido com **Angular (frontend)** e **NestJS + Prisma (backend)**, utilizando **PostgreSQL** e **Redis**.  
Toda a aplicação é executada em **containers Docker**, não sendo necessária a instalação de dependências adicionais além do Docker.

---

## Requisitos
- Docker instalado e em execução.

---

## Funcionalidades
- Criação e gerenciamento de produtos  
- Criação e gerenciamento de pedidos  
- Autenticação e autorização de usuários  
- Integração com Redis para cache  

---


## Rotas do Backend

### Produtos
- `GET /products` – Lista todos os produtos  
- `GET /products/:id` – Detalhes de um produto específico  
- `POST /products` – Cria um novo produto  
- `PUT /products/:id` – Atualiza um produto específico  
- `DELETE /products/:id` – Deleta um produto específico  

### Pedidos
- `GET /orders` – Lista todos os pedidos  
- `GET /orders/:id` – Detalhes de um pedido específico  
- `POST /orders` – Cria um novo pedido  
- `PUT /orders/:id` – Atualiza um pedido específico  
- `DELETE /orders/:id` – Deleta um pedido específico  

### Usuários
- `POST /login` – Autenticação de usuário  
- `POST /register` – Cadastro de usuário  

---

## Rotas do Frontend
- `/` – Página inicial 
- `/products` – Lista de produtos por categoria
 <img width="1764" height="940" alt="image" src="https://github.com/user-attachments/assets/e78dc9b7-d9fb-4f48-910e-57b70032ed53" />

 
- `/products/:id` – Detalhes de um produto específico
- `/orders/:id` - Informações de pedidos do usuário ( Lista pedidos de todos os usuários para o Admin)
  <img width="1764" height="940" alt="image" src="https://github.com/user-attachments/assets/dadf1436-827d-4767-a74e-3943e3014ddc" />

  
- `/login` – Página de login
  <img width="1665" height="940" alt="image" src="https://github.com/user-attachments/assets/97a12e24-0475-4a6c-8aa4-71dd1ad35ddc" />

  
- `/register` – Página de cadastro  

---

## Execução

### Subindo todos os serviços
```bash
./start-festival.sh
```

Endpoints
- Serviço	Endereço
- Frontend	http://localhost:4200
- Backend	http://localhost:3000
- PostgreSQL	localhost:5432
- Redis	localhost:6379


Visualizar logs
docker-compose logs -f

Encerrar serviços
docker-compose down

Usuário Administrador para Teste

    Email: admin@admin.com

    Senha: Admin123
