import Item from "./Components/Item/index.js";

class App {
  render() {
    const item = new Item(6);
    item.init();
  }
}

export default App;
