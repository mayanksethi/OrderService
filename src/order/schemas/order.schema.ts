import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 } from 'uuid';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ default: `order_${v4()}` })
  orderId: string;

  @Prop()
  userId: string;

  @Prop([String])
  productIds: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
