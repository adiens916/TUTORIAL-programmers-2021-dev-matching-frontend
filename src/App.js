import Component from "./core/Component.js";
import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageView from "./components/ImageView.js";
import { getNodes } from "./api/app.js";

/**
 * @typedef {import("./types.js").Node} Node
 */

export default class App extends Component {
  setup() {
    /**
     * @type {{
     *  parentNodeId: string,
     *  nodes: Node[]
     * }}
     */
    this.$state = {
      parentNodeId: "",
      nodes: [],
    };
  }

  template() {
    return `
      <main class="App">
        <div data-component="Breadcrumb"></div>
        <div data-component="Nodes"></div>
        <div data-component="ImageView"></div>
      </main>
    `;
  }

  mounted() {
    const $nodes = this.getComponentTag("Nodes");
    new Nodes($nodes, {});
  }
}
