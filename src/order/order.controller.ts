import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: any) {
    console.log('createOrderDto', createOrderDto);
    return this.orderService.create(createOrderDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get('/history/product/:id')
  async getOrderHistory(@Param('id') id: string) {
    return this.orderService.getProductOrderHistory(id);
  }

  @Delete(':id')
  async cancel(@Param('id') id: string) {
    return this.orderService.cancel(id);
  }
}
