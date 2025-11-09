import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IHeader {
  counter: number;
}

export class Header extends Component<IHeader> {
  protected buttonBacket: HTMLButtonElement;
  protected countElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.countElement = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container
    );
    this.buttonBacket = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container
    );

    this.buttonBacket.addEventListener("click", () => {
      this.events.emit("basket:open");
    });
  }

  set counter(value: number) {
    this.countElement.textContent = String(value);
  }
}
