import { IBuyer } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export interface IForm extends Partial<IBuyer> {
  error: string | undefined;
}

export abstract class Form<T extends IForm> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorContainer: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.submitButton = ensureElement<HTMLButtonElement>(
      ".modal__actions button",
      this.container
    );
    this.errorContainer = ensureElement<HTMLElement>(
      ".form__errors",
      this.container
    );

    this.container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this.events.emit(`${this.container.getAttribute("name")}:submit`);
    });
  }

  protected onInputChange(field: keyof IBuyer, value: string | undefined) {
    this.events.emit("form:change", { field, value });
  }

  set error(value: string | undefined) {
    this.errorContainer.textContent = value || '';
  }

  set submit(value: boolean) {
    this.submitButton.disabled = !value;
  }
}
