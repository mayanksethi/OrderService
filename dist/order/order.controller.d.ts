import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: any): Promise<import("./schemas/order.schema").Order>;
    findOne(id: string): Promise<import("./schemas/order.schema").Order>;
    getOrderHistory(id: string): Promise<import("./schemas/order.schema").Order[]>;
    cancel(id: string): Promise<string>;
}
