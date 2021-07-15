import Controller from '@ember/controller';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import { task, timeout } from 'ember-concurrency';
import { Stock } from 'cox-coding-exercise-client/app/models/stock';

export default class Application extends Controller {
  @service stockService;
  @service paperToaster;
  stockOptions = [];
  watchedStocks = A([]);
  selectedStock = null;
  @tracked
  isConnected = false;

  constructor() {
    super(...arguments);
    const websocket = this.stockService.watch();
    websocket.on('message', (event) => {
      const updatedStock = JSON.parse(event.data);
      const foundStock = this.watchedStocks.find(stock => stock.symbol === updatedStock.symbol);
      if (foundStock) {
        foundStock.price = updatedStock.price;
        foundStock.minprice=updatedStock.minprice;
        foundStock.maxprice=updatedStock.maxprice;
      } else {
        this.watchedStocks.pushObject(new Stock({
          symbol: updatedStock.symbol,
          name: null,
          price: updatedStock.price,
          minprice:updatedStock.minprice,
          maxprice:updatedStock.maxprice
        }));
      }
    });

    websocket.on('open', () => this.isConnected = true);
    websocket.on('close', () => {
      this.isConnected = false;
      this.set('watchedStocks', A([]));
    });
  }

  @task(function * (searchTerm) {
    yield timeout(300);
    if (searchTerm && searchTerm.trim()) {
      return this.stockService.searchStocks(searchTerm.trim()).then((stockOptions => {
        this.set('stockOptions', stockOptions);
      }));
    }
  }).restartable() searchForStocks;

  @action
  async onStockSelected(selected) {
    this.set('selectedStock', selected);
    if (selected && selected.symbol) {
      const exists = this.watchedStocks.find(ws => ws.symbol === selected.symbol);
      if (!exists) {
        const { symbol, name } = selected;
        await this.stockService.addStockToWatcher(symbol).catch(() => {});
        this.watchedStocks.pushObject(new Stock({ symbol, name, price: null, minprice:null, maxprice:null }));
        this._showToast(`Added ${symbol} to the stock watcher`, 'success-toast');
      }
    }
  }

  @action
  async removeStock(stock) {
    await this.stockService.removeStockFromWatcher(stock.symbol);
    this.watchedStocks.removeObject(stock);
    this._showToast(`Removed ${stock.symbol} from the stock watcher`, 'danger-toast');
  }

  // @action
  // async getAverage(stock) {
  //   await this.stockService.averageStockFromWatcher(stock.symbol);
  //   this.watchedStocks.removeObject(stock);
  //   this._showToast(`Average price of ${stock.symbol} from the stock watcher`, 'danger-toast');
  // }

  _showToast(message, toastClass) {
    const activeToast = this.paperToaster.get('activeToast');
    if (activeToast) {
      this.paperToaster.cancelToast(activeToast);
    }
    this.paperToaster.show(message, {
      toastClass: toastClass,
      position: 'top right'
    });
  }
}
