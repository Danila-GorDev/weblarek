import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class Products {

  // хранит массив всех товаров
  protected products: IProduct[] = [];
  // хранит товар, выбранный для подробного отображения
  protected product: IProduct | undefined;
  protected event: IEvents

  constructor(event:IEvents){
    this.event = event
  }

  // сохранение массива товаров полученного в параметрах метода;
  setItems(products: IProduct[]): void {
    this.products = products
    this.event.emit('product:chenged');
  }
  // получение массива товаров из модели
  getItems(): IProduct[] {
    return this.products
  }

  // получение одного товара по его id
  getItem(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id)
 }

   // сохранение товара для подробного отображения
  setSelectedProduct(id: string): void {
    const product = this.products.find(product => product.id === id)
    this.product = product;
    this.event.emit('product:chenged');
  }

  //  получение товара для подробного отображения
  getSelectedProduct(): IProduct | undefined {
    return this.product;
  }
}
