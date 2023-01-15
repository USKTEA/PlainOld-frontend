export default class Item {
  constructor({
    id, productId, price, name, thumbnailUrl,
    shippingFee, freeShippingAmount, quantity,
    option,
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
    this.option = option;
  }

  hasOption() {
    return !!this.option
    && (this.option.size !== 'FREE' && this.option.color !== '');
  }
}
