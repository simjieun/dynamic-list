import Modal from "../Modal/index.js";

export const ITEM_COUNT = 6;
export const MAX_ITEM_COUNT = 100;

class Item {
  constructor(count = ITEM_COUNT) {
    this.parentElement = document.querySelector("#app");
    this.renderElement = Item.createRenderElement(count);
    this.modal = new Modal({ parentElement: this.parentElement });
    this.bindEvents();
  }

  static createRenderElement(count) {
    const itemCount =
      typeof count === "number" ? Math.min(count, MAX_ITEM_COUNT) : ITEM_COUNT;
    const itemContainer = document.createElement("ul");
    itemContainer.classList.add("item-list");

    const items = Array(itemCount)
      .fill(1)
      .map((v, i) => {
        const itemElement = document.createElement("li");
        itemElement.classList.add("item");
        itemElement.innerHTML = v + i;
        return itemElement;
      });

    itemContainer.append(...items);
    return itemContainer;
  }

  bindEvents() {
    this.renderElement.addEventListener("mouseover", ({ target }) => {
      this.updateNearByItems("mouseover", target);
    });

    this.renderElement.addEventListener("mouseout", ({ target }) => {
      this.updateNearByItems("mouseout", target);
    });

    this.renderElement.addEventListener("click", ({ target }) => {
      if (!this.isItem(target)) {
        return;
      }
      this.modal.open(target.innerHTML);
    });
  }

  isItem(target) {
    return !!target.closest(".item");
  }

  updateNearByItems(action, target) {
    if (!this.isItem(target)) {
      return;
    }

    const previousElement = target.previousElementSibling;
    const nextElement = target.nextElementSibling;

    if (previousElement) {
      previousElement.classList[action === "mouseover" ? "add" : "remove"](
        "near"
      );
    }
    if (nextElement) {
      nextElement.classList[action === "mouseover" ? "add" : "remove"]("near");
    }
  }

  render() {
    this.parentElement.append(this.renderElement);
  }

  init() {
    this.render();
  }
}

export default Item;
