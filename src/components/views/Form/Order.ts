import { TPayment } from "../../../types";
import { ensureAllElements, ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form, IForm } from "./Form";

export class Order extends Form<IForm> {
  protected btnOrder: HTMLButtonElement[];
  protected addresInput: HTMLInputElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container, events);

    this.btnOrder = ensureAllElements<HTMLButtonElement>(
      ".button",
      this.container
    );
    this.addresInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container
    );

    this.addresInput.addEventListener("input", () => {
      this.onInputChange("address", this.addresInput.value);
    });

    this.btnOrder.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.onInputChange("payment", btn.name as TPayment);
      });
    });
  }

  set payment(payment: string | undefined) {
    this.btnOrder.forEach((btn) => {
      btn.classList.toggle("button_alt-active", btn.name === payment);
    });
  }
}
