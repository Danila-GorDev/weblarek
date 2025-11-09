import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected btnClose: HTMLButtonElement;
  protected modalContent: HTMLElement;

  constructor(protected events: IEvents, component: HTMLElement) {
    super(component);

    this.btnClose = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container
    );
    this.modalContent = ensureElement<HTMLElement>(
      ".modal__content",
      this.container
    );

    this.btnClose.addEventListener("click", this.closeModal.bind(this));
    this.container.addEventListener("click", this.closeModal.bind(this));
    this.modalContent.addEventListener("click", (event) =>
      event.stopPropagation()
    );
  }

  set content(items: HTMLElement) {
    this.modalContent.replaceChildren(items);
  }

  openModal(): void {
    this.container.classList.add("modal_active");
  }

  closeModal(): void {
    this.container.classList.remove("modal_active");
  }
}
