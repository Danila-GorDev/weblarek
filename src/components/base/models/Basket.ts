import { IProduct } from '../../../types';

export class Basket {

  //хранит массив товаров, выбранных покупателем для покупки
  protected items: IProduct[] = []

  //получение массива товаров, которые находятся в корзине
  getItems(): IProduct[] {
    return this.items;
  }
  //добавление товара, который был получен в параметре, в массив корзины
  addItem(product: IProduct): void {
    this.items.push(product);
  }
  //удаление товара, полученного в параметре из массива корзины
  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.id !== productId);
  }
  //очистка корзины
  clear(): void {
    this.items = [];
  }
  //получение стоимости всех товаров в корзине
  getTotalPrice(): number {
    return this.items.reduce((total, item) => {
      return total + (item.price || 0);
    }, 0);
  }
  //получение количества товаров в корзине
  getTotalItems(): number {
    return this.items.length;
  }
  //проверка наличия товара в корзине по его id, полученного в параметр метода
  hasItem(productId: string): boolean {
    return this.items.some(item => item.id === productId);
  }
}