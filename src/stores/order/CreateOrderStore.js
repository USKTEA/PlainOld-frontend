import Store from '../Store';

import OrderSpecification from '../../models/OrderSpecification';

import { apiService } from '../../services/ApiService';

export default class CreateOrderStore extends Store {
  constructor() {
    super();

    this.result = null;

    this.processing = false;

    this.errors = {
      createOrder: '',
    };

    this.errorMessage = {
      createOrderFailed: '주문이 정상적으로 처리되지 않았습니다.',
    };
  }

  async createOrder({
    orderItems, orderer, shippingInformation, payment,
  }) {
    const orderSpecification = new OrderSpecification({
      orderItems, orderer, shippingInformation, payment,
    });

    this.startProcessing();

    try {
      const result = await apiService.createOrder(orderSpecification);

      this.completeProcess(result);
    } catch (e) {
      this.orderFailed();
    }
  }

  startProcessing() {
    this.processing = true;
    this.result = null;
    this.publish();
  }

  completeProcess(result) {
    this.processing = false;
    this.result = result;
    this.publish();
  }

  orderFailed() {
    this.processing = false;
    this.product = null;
    this.errors.createOrder = this.errorMessage.createOrderFailed;
    this.publish();
  }

  clear() {
    this.result = null;
    this.errors = {
      createOrder: '',
    };

    this.publish();
  }
}

export const createOrderStore = new CreateOrderStore();
