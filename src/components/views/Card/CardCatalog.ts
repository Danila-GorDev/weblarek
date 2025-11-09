import { categoryMap, CDN_URL } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card, CategoryKey, ICard } from "./Card";

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

interface ICardCatalog extends ICard {
  image: string;
  category: string;
}

export class CardCatalog extends Card<ICardCatalog> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;
  protected productId: string = "";

  constructor(container: HTMLElement, action?: ICardActions) {
    super(container);

    this.cardCategory = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );
    this.cardImage = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );

    if (action?.onClick) {
      this.container.addEventListener("click", action.onClick);
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

    set id(value: string) {
    this.productId = value;
  }
}
