"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
const axios_1 = require("axios");
let OrderService = class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async updateOrderQuantity(productIds, action) {
        await (0, axios_1.default)({
            method: 'PUT',
            url: `${process.env.PRODUCT_URL}/product/quantity/${action}`,
            data: {
                productIds,
            },
        }).catch(() => {
            throw new common_1.ForbiddenException('API not available');
        });
    }
    async create(createOrderDto) {
        const createdOrder = new this.orderModel(createOrderDto);
        await this.updateOrderQuantity(createOrderDto.productIds, 'decrease');
        return createdOrder.save();
    }
    async findOne(orderId) {
        return this.orderModel.findOne({ orderId: orderId }).exec();
    }
    async cancel(id) {
        this.orderModel.deleteOne({ _id: id }).exec();
        await this.updateOrderQuantity([id], 'increase');
        return 'Cancelled successfully';
    }
    async getProductOrderHistory(id) {
        return this.orderModel.find({ productIds: id });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrderService);
//# sourceMappingURL=order.service.js.map