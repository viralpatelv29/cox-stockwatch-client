import { computed } from '@ember/object';

export class StockResult {
  symbol = null;
  name = null;
  minprice=null;
  maxprice=null;

  constructor(symbol, name,minprice, maxprice) {
    this.symbol = symbol;
    this.name = name;
    this.minprice=minprice;
    this.maxprice=maxprice;
  }

  @computed('symbol', 'name')
  get displayName() {
    return `(${this.symbol}) ${this.name} ${this.minprice} ${this.maxprice}`;
  }
}
