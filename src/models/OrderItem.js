export default class OrderItem {
  constructor({
    id, productId, price, name, thumbnailUrl,
    shippingFee, freeShippingAmount, quantity,
  }) {
    this.id = id;
    this.productId = productId;
    this.price = price;
    this.name = name;
    this.thumbnailUrl = thumbnailUrl;
    this.shippingFee = shippingFee;
    this.freeShippingAmount = freeShippingAmount;
    this.quantity = quantity || 1;
    this.totalPrice = this.price * this.quantity;
  }
}
