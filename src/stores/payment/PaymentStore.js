/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */

import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class PaymentStore extends Store {
  constructor() {
    super();

    this.paymentProvider = null;
    this.prePaymentId = null;
    this.partnerOrderId = null;
  }

  async getReadyPayment({ provider, orderItems }) {
    try {
      const {
        paymentProvider, prePaymentId, partnerOrderId, redirectUrl,
      } = await apiService.getReadyPayment(
        { provider, orderItems },
      );

      this.paymentProvider = paymentProvider;
      this.prePaymentId = prePaymentId;
      this.partnerOrderId = partnerOrderId;

      return redirectUrl;
    } catch (error) {
      return '';
    }
  }

  async approve({
    provider, pgToken, prePaymentId, partnerOrderId,
  }) {
    try {
      const { approveCode } = await apiService.getApproveCode(
        {
          provider, pgToken, prePaymentId, partnerOrderId,
        },
      );

      return approveCode;
    } catch (error) {
      return '';
    }
  }
}

export const paymentStore = new PaymentStore();
