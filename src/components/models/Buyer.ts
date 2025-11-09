import { IBuyer, TPayment, TBuyerErrors } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
  //вид оплаты
  protected payment: TPayment;
  //адресс
  protected address: string = '';
  //телефон
  protected phone: string = '';
  //email
  protected email: string = '';
  protected event: IEvents;

  constructor(event:IEvents){
    this.event = event;
  }

  //сохранение данных в модели
  setBuyerData(data: Partial<IBuyer>): void {
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
    this.event.emit('data:change');
  }

  //получение всех данных покупателя
  getBuyerData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };
  }
  //очистка данных покупателя
  clearData(): void {
    this.payment = undefined;
    this.address = '';
    this.phone = '';
    this.email = '';
    this.event.emit('data:change');
  }
  //валидация данных
 validate(): {
  isValid: boolean;
  errors: TBuyerErrors;
} {
  const errors: TBuyerErrors = {};

  if (this.payment === undefined) {
    errors.payment = 'Метод оплаты не указан';
  }

  if (!this.address) {
    errors.address = 'Адрес не указан';
  }

  if (!this.email) {
    errors.email = 'Email не указан';
  }

  if (!this.phone) {
    errors.phone = 'Телефон не указан';
  }
  
  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    errors
  };
}
}