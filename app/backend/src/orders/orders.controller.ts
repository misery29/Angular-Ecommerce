import { Controller, Post, Body, Get, Param, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin,guard';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.ordersService.create(createOrderDto, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.ordersService.findByUser(req.user.id)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.ordersService.findOneByUser(id, req.user.id);
  }

  @UseGuards(AdminGuard)
  @Get('/admin/all')
  findAllOrdersForAdmin() {
    return this.ordersService.findAllOrders();
  }
}