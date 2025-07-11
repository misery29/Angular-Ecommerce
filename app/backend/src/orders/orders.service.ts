import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    // Busca os produtos para pegar o preço atual
    const products = await this.prisma.product.findMany({
      where: { id: { in: data.items.map(i => i.productId) } }
    });

    // Monta os itens do pedido com preço do momento
    const orderItems = data.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) throw new NotFoundException(`Produto ${item.productId} não encontrado`);
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    });

    // Calcula o total
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Cria o pedido e os itens
    return this.prisma.order.create({
      data: {
        clientId: data.clientId,
        total,
        items: {
          create: orderItems,
        },
      },
      include: { items: true },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({ include: { items: true } });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }

  async findByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { clientId: userId },
      include: { items: true },
    });
  }
  
}