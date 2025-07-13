
FROM node:20-alpine

WORKDIR /app

# Instalar serve para servir arquivos estáticos
RUN npm install -g serve

# Copiar package.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Expor porta 80
EXPOSE 80

# Comando para servir os arquivos buildados
CMD ["serve", "-s", "dist/frontend/browser", "-l", "80", "--no-clipboard"] 