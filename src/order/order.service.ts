import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrder } from './createOrder.dto';
import axios from 'axios';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async updateOrderQuantity(productIds: string[], action: string) {
    await axios({
      method: 'PUT',
      url: `${process.env.PRODUCT_URL}/product/quantity/${action}`,
      data: {
        productIds,
      },
    }).catch(() => {
      throw new ForbiddenException('API not available');
    });
  }

  async create(createOrderDto: CreateOrder): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    await this.updateOrderQuantity(createOrderDto.productIds, 'decrease');
    return createdOrder.save();
  }

  async findOne(orderId: string): Promise<Order> {
    return this.orderModel.findOne({ orderId: orderId }).exec();
  }

  async cancel(id: string): Promise<string> {
    this.orderModel.deleteOne({ _id: id }).exec();
    await this.updateOrderQuantity([id], 'increase');
    return 'Cancelled successfully';
  }

  async getProductOrderHistory(id: string): Promise<Order[]> {
    return this.orderModel.find({ productIds: id });
  }
}
