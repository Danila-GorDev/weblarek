import { IBuyer } from '../../../types';

export class Buyer {

  //вид оплаты
  protected payment: 'card' | 'cash' | undefined;
  //адресс
  protected address: string | undefined;
  //телефон
  protected phone: string | undefined;
  //email
  protected email: string | undefined;


  //сохранение данных в модели
 setBuyerData(data: IBuyer): void {
    if (data.payment) {
      this.payment = data.payment;
    }
    if (data.address) {
      this.address = data.address;
    }
    if (data.phone) {
      this.phone = data.phone;
    }
    if (data.email) {
      this.email = data.email;
    }
  }

  //получение всех данных покупателя
  getBuyerData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email
    };
  }
  //очистка данных покупателя
  clearData(): void {
    this.payment = undefined;
    this.address = undefined;
    this.phone = undefined;
    this.email = undefined;
  }
  //валидация данных
  validate(): {
    isValid: boolean;
    errors: {
      payment?: string;
      address?: string;
      phone?: string;
      email?: string;
    }
  } {
    const errors: any = {};
    let isValid = true;

    if (this.payment === undefined) {
      errors.payment = 'Метод оплаты не указан';
      isValid = false;
    }

    if (!this.address) {
      errors.address = 'Адрес не указан';
      isValid = false;
    }

    if (!this.phone) {
      errors.phone = 'Телефон не указан';
      isValid = false;
    }

    if (!this.email) {
      errors.email = 'Email не указан';
      isValid = false;
    }

    return {
      isValid,
      errors
    };
  }
}