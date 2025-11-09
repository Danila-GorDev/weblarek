import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
  list: HTMLElement[];
  total: number;
  btnStatus: boolean;
}

export class CBasket extends Component<IBasket> {
  protected totalElem: HTMLElement;
  protected btnOrder: HTMLButtonElement;
  protected listContainer: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.totalElem = ensureElement<HTMLElement>('.basket__price', this.container);
    this.btnOrder = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.listContainer = ensureElement<HTMLElement>('.basket__list', this.container);

    this.btnOrder.disabled = true;

    this.btnOrder.addEventListener('click', () => {
      this.events.emit('form:order');
    });
  }

  set list(items: HTMLElement[]) {
      this.listContainer.replaceChildren(...items);
  }

  set total(value: number) {
    this.totalElem.textContent = `${value} синапсов`;
  }

  set btnStatus(value:boolean) {
    this.btnOrder.disabled = value
  }
}
