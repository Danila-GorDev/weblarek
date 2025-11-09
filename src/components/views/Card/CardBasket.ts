import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card, ICard } from "./Card";

interface ICardBasket extends ICard {
  index: number;
}

export class CardBasket extends Card<ICardBasket> {
  protected indexElement: HTMLElement;
  protected deleteProduct: HTMLButtonElement;
  protected productId: string = "";

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container
    );
    this.deleteProduct = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );

    this.deleteProduct.addEventListener("click", () =>
      this.events.emit("product:delete", { id: this.productId })
    );
  }

  set index(value: number) {
    this.indexElement.textContent = value.toString();
  }

  set id(value: string) {
    this.productId = value;
  }
}
