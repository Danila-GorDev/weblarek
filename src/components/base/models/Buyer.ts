import { IBuyer, TPayment, TBuyerErrors } from "../../../types";

export class Buyer {
  //вид оплаты
  protected payment: TPayment;
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
      email: this.email,
    };
  }
  //очистка данных покупателя
  clearData(): void {
    this.payment = undefined;
    this.address = "";
    this.phone = "";
    this.email = "";
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