import { categoryMap, CDN_URL } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card, CategoryKey } from "./Card";

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

interface ICardCatalog {
  image: string;
  category: string;
}

export class CardCatalog extends Card<ICardCatalog> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.cardCategory = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );
    this.cardImage = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }

  set category(value: string) {
    this.cardCategory.textContent = value;

    for (const key in categoryMap) {
      this.cardCategory.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }

  set image(value: string) {
    this.cardImage.src = `${CDN_URL}/${value}`;
    this.cardImage.alt = this.title;
  }
}
