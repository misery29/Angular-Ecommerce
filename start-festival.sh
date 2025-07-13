#!/bin/bash

echo "🎪 Iniciando Festival App..."
echo "================================"

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker primeiro."
    exit 1
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down

# Remover imagens antigas (opcional)
read -p "Deseja remover imagens antigas? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️ Removendo imagens antigas..."
    docker-compose down --rmi all
fi

# Build e iniciar containers
echo "🔨 Fazendo build dos containers..."
docker-compose build

echo "🚀 Iniciando aplicação..."
docker-compose up -d

# Aguardar um pouco para os serviços iniciarem
echo "⏳ Aguardando serviços iniciarem..."
sleep 10

# Verificar status dos containers
echo "📊 Status dos containers:"
docker-compose ps

echo ""
echo "🎉 Festival App iniciado com sucesso!"
echo "================================"
echo "🌐 Frontend: http://localhost"
echo "🔧 Backend: http://localhost:3000"
echo "🗄️  Database: localhost:5432"
echo ""
echo "📝 Logs em tempo real: docker-compose logs -f"
echo "🛑 Para parar: docker-compose down" 