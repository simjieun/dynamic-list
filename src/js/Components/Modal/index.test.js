import Modal from "./index.js";

describe("Components/Modal", () => {
  let modal;
  let parentElement;
  const modalClassName = "modal";

  beforeAll(() => {
    document.body.innerHTML = "<div id='app'></div>";
    parentElement = document.querySelector("#app");
    modal = new Modal({ parentElement });
  });

  it("should have default elements", () => {
    const renderElement = Modal.createRenderElement();

    expect(renderElement.classList.contains(modalClassName)).toBe(true);
    expect(renderElement.getElementsByClassName("content").length).toBe(1);
    expect(renderElement.getElementsByTagName("SPAN")).toHaveLength(1);
  });

  it("should not render components when modal container is clicked", () => {
    modal.open();
    modal.renderElement.click();

    expect(parentElement.getElementsByClassName(modalClassName).length).toBe(0);
  });

  it("should remove the modal from the parent element", () => {
    modal.open();
    modal.close();

    expect(parentElement.contains(modal.renderElement)).toBe(false);
  });
});
