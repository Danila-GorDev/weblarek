import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form, IForm } from "./Form";

export class Contact extends Form<IForm> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container, events);

    this.emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container
    );

    this.phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container
    );

    this.emailInput.addEventListener("input", () => {
      this.onInputChange("email", this.emailInput.value);
    });

    this.phoneInput.addEventListener("input", () => {
      this.onInputChange("phone", this.phoneInput.value);
    });
  }
}
