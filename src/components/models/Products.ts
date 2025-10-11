import { IProduct } from '../../types';

export class Products {

  // хранит массив всех товаров
  protected products: IProduct[] = [];
  // хранит товар, выбранный для подробного отображения
  protected product: IProduct | undefined;

  // сохранение массива товаров полученного в параметрах метода;
  setItems(products: IProduct[]): void {
    this.products = products
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
  }

  //  получение товара для подробного отображения
  getSelectedProduct(): IProduct | undefined {
    return this.product;
  }
}
