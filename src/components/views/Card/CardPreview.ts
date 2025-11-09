import { IProduct } from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card, CategoryKey } from "./Card";

export class CardPreview extends Card<IProduct> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;
  protected descriptionElement: HTMLElement;
  protected btnAdd: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.cardCategory = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );
    this.cardImage = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );
    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container
    );
    this.btnAdd = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );

    this.btnAdd.addEventListener("click", () => {
      this.events.emit("preview:button");
    });
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

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.btnAdd.textContent = String(value);
    if (value === "Недоступно") {
      this.btnAdd.disabled = true;
    }
  }
}
