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
     *  currentNodeId: string,
     *  childNodes: Node[],
     *  depth: string[]
     * }}
     */
    this.$state = {
      currentNodeId: "",
      childNodes: [],
      depth: [],
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
      currentNodeId: this.$state.currentNodeId,
      childNodes: this.$state.childNodes,
      onClick: this.onClick.bind(this),
      onPrevButton: this.onPrevButton.bind(this),
    });
  }

  loadData() {
    this.setNodes("");
  }

  async setNodes(currentNodeId) {
    try {
      const childNodes = await getNodes(currentNodeId);
      console.log(childNodes);

      this.setState({
        currentNodeId,
        childNodes,
        depth: [...this.$state.depth, currentNodeId],
      });
    } catch (error) {
      console.log(error);
    }
  }

  /** @param {Node} node */
  async onClick(node) {
    try {
      if (node.type == "DIRECTORY") {
        await this.setNodes(node.id);
      } else if (node.type == "FILE") {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onPrevButton() {
    const { depth } = this.$state;
    depth.pop();
    const parentNodeId = depth.pop();

    try {
      await this.setNodes(parentNodeId);
    } catch (error) {
      console.log(error);
    }
  }
}
