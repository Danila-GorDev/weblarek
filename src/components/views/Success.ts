import { IOrder } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Success extends Component<IOrder> {
  protected closeButton: HTMLButtonElement;
  protected totalPrise: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container
    );
    this.totalPrise = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container
    );

    this.closeButton.addEventListener("click", () =>
      this.events.emit("button:close")
    );
  }

  set total(value: number) {
    this.totalPrise.textContent = `Списано ${String(value)} синапсов`;
  }
}
