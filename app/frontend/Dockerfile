
FROM node:20-alpine

WORKDIR /app


RUN npm install -g serve


COPY package*.json ./


RUN npm ci


COPY . .


RUN npm run build


EXPOSE 80


CMD ["serve", "-s", "dist/frontend/browser", "-l", "80", "--no-clipboard"] 