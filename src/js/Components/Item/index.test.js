import Item, { ITEM_COUNT, MAX_ITEM_COUNT } from "./index.js";

describe("Components/Item", () => {
  beforeEach(() => {
    document.body.innerHTML = "<div id='app'></div>";
  });

  it("should have default elements", () => {
    const className = "item-list";
    const itemList = Item.createRenderElement(ITEM_COUNT);

    expect(itemList.classList.contains(className)).toBe(true);
    expect(itemList.querySelectorAll(".item").length).toBe(ITEM_COUNT);
  });

  it("should be created max 100", () => {
    const count = MAX_ITEM_COUNT + 10;
    const item = new Item(count);

    expect(item.renderElement.querySelectorAll(".item").length).toBe(
      MAX_ITEM_COUNT
    );
  });

  it('should add "near" class to the previous/next sibling element on mouseover event', () => {
    const item = new Item(ITEM_COUNT);
    const target = item.renderElement.querySelector(".item:nth-child(3)");
    const previousElement = target.previousElementSibling;
    const nextElement = target.nextElementSibling;
    item.updateNearByItems("mouseover", target);

    expect(previousElement.classList.contains("near")).toBe(true);
    expect(nextElement.classList.contains("near")).toBe(true);
  });

  it('should remove "near" class to the previous/next sibling element on mouseout event', () => {
    const item = new Item(ITEM_COUNT);
    const target = item.renderElement.querySelector(".item:nth-child(3)");
    const previousElement = target.previousElementSibling;
    const nextElement = target.nextElementSibling;
    item.updateNearByItems("mouseout", target);

    expect(previousElement.classList.contains("near")).toBe(false);
    expect(nextElement.classList.contains("near")).toBe(false);
  });

  it("should render modal component when item is clicked", () => {
    const item = new Item(ITEM_COUNT);
    item.render();

    const parentElement = item.parentElement;
    const itemElement = item.renderElement.querySelectorAll(".item");
    itemElement[0].click();

    expect(parentElement.getElementsByClassName("modal")).toHaveLength(1);
  });
});
