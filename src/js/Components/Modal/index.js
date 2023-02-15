class Modal {
  constructor({ parentElement = document.querySelector("#app") }) {
    this.parentElement = parentElement;
    this.renderElement = Modal.createRenderElement();
    this.bindEvents();
  }

  static createRenderElement() {
    const modalContainer = document.createElement("div");
    const modalContent = document.createElement("div");
    const modalText = document.createElement("span");

    modalContainer.classList.add("modal");
    modalContent.classList.add("content");

    modalContent.appendChild(modalText);
    modalContainer.appendChild(modalContent);

    return modalContainer;
  }

  bindEvents() {
    this.renderElement.addEventListener("click", ({ target }) => {
      if (this.renderElement === target) {
        this.close();
      }
    });
  }

  open(text = "") {
    this.renderElement.querySelector("span").innerHTML = text;
    this.parentElement.appendChild(this.renderElement);
  }

  close() {
    if (this.parentElement.contains(this.renderElement)) {
      this.parentElement.removeChild(this.renderElement);
    }
  }
}

export default Modal;
