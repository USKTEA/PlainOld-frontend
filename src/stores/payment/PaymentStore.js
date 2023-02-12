/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */

import { apiService } from '../../services/ApiService';
import Store from '../Store';

export default class PaymentStore extends Store {
  constructor() {
    super();

    this.paymentProvider = null;
    this.tidId = null;
    this.partnerOrderId = null;
  }

  async getReadyPayment({ provider, orderItems }) {
    try {
      const {
        paymentProvider, tidId, partnerOrderId, redirectUrl,
      } = await apiService.getReadyPayment(
        { provider, orderItems },
      );

      this.paymentProvider = paymentProvider;
      this.tidId = tidId;
      this.partnerOrderId = partnerOrderId;

      return redirectUrl;
    } catch (error) {
      return '';
    }
  }

  async approve({
    provider, pgToken, tidId, partnerOrderId,
  }) {
    try {
      const { approveCode } = await apiService.getApproveCode(
        {
          provider, pgToken, tidId, partnerOrderId,
        },
      );

      return approveCode;
    } catch (error) {
      return '';
    }
  }
}

export const paymentStore = new PaymentStore();
