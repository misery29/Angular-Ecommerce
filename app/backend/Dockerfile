# Dockerfile para app/backend

FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gera o Prisma Client (importante para produção)
RUN npx prisma generate

# Expõe a porta padrão do NestJS
EXPOSE 3000

# Comando padrão (pode ser sobrescrito pelo docker-compose)
CMD ["npm", "run", "start:dev"]