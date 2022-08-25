import Component from "./core/Component.js";
import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageView from "./components/ImageView.js";
import { getNodes } from "./api/app.js";

/**
 * @typedef {import("./types.js").Node} Node
 */

export default class App extends Component {
  initState() {
    console.log("App setup");
    /**
     * @type {{
     *  nodeId: string,
     *  nodes: Node[]
     * }}
     */
    this.$state = {
      nodeId: "",
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

  mountComponent() {
    const $nodes = this.getComponentTag("Nodes");
    new Nodes($nodes, {
      nodeId: this.$state.nodeId,
      nodes: this.$state.nodes,
      setNodes: this.setNodes.bind(this),
    });
  }

  loadData() {
    this.setNodes(this.$state.nodeId);
  }

  async setNodes(nodeId) {
    const nodes = await getNodes(nodeId);
    console.log(nodes);
    this.setState({
      nodeId,
      nodes: nodes,
    });
  }
}
