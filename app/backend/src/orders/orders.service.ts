// src/orders/orders.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto, userId: number) {
    const products = await this.prisma.product.findMany({
      where: { id: { in: data.items.map(i => i.productId) } }
    });

    const orderItems = data.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) throw new NotFoundException(`Produto ${item.productId} não encontrado`);
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return this.prisma.order.create({
      data: {
        clientId: userId,
        total,
        items: {
          create: orderItems,
        },
      },
      include: { items: true },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { clientId: userId },
      include: { items: { include: { product: true } } },
    });
  }

  async findOneByUser(orderId: number, userId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, clientId: userId },
      include: { items: { include: { product: true } } },
    });
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }

  async findAllOrders() {
    return this.prisma.order.findMany({
      include: {
        items: { include: { product: true } },}
    })};

};