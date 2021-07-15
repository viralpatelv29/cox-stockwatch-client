import { tracked } from '@glimmer/tracking';

export class Stock {
  symbol = null;
  name = null;
  @tracked price = null;
  @tracked minprice = null;
  @tracked maxprice = null;
  numberFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  constructor({ symbol, name, price }) {
    this.symbol = symbol;
    this.name = name;
    this.price = price;
    this.minprice=0;
    this.maxprice=0;
  }

  get displayPrice() {
    const price = this.price;
    return price ? `$${this.numberFormatter.format(this.price)}` : 'Price not available';
  }
  // get avgPrice() {
  //   const avgprice = (this.minprice+ this.maxprice)/2;
  //   return avgprice ? `$${this.numberFormatter.format(this.avgprice)}` : 'Average Price not available';
  // }
}
