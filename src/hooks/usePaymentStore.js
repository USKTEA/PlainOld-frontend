import useStore from './useStore';
import { paymentStore } from '../stores/payment/PaymentStore';

export default function usePaymentStore() {
  return useStore(paymentStore);
}
