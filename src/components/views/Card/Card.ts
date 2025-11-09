import { IProduct } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export type CategoryKey = keyof typeof categoryMap;

interface ICard extends Partial<IProduct> {
  index?: number;
}

export abstract class Card<T extends ICard> extends Component<T> {
  protected cardTitle: HTMLElement;
  protected cardPrise: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.cardTitle = ensureElement<HTMLElement>(".card__title", this.container);
    this.cardPrise = ensureElement<HTMLElement>(".card__price", this.container);
  }

  set title(text: string) {
    this.cardTitle.textContent = text;
  }

  set price(value: number | null) {
    if (value === null) {
      this.cardPrise.textContent = "Бесценно";
    } else {
      this.cardPrise.textContent = `${value} синапсов`;
    }
  }
}
