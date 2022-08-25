import Component from "./core/Component.js";
import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageView from "./components/ImageView.js";
import Loading from "./components/Loading.js";
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
     *  depth: string[],
     *  selectedFilePath: string,
     *  isLoading: boolean,
     * }}
     */
    this.$state = {
      currentNodeId: "",
      childNodes: [],
      depth: [],
      selectedFilePath: "",
      isLoading: false,
    };
  }

  template() {
    return `
      <main class="App">
        <div data-component="Breadcrumb"></div>
        <div data-component="Nodes"></div>
        <div data-component="ImageView"></div>
        <div data-component="Loading"></div>
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

    const $imageView = this.getComponentTag("ImageView");
    new ImageView($imageView, {
      selectedFilePath: this.$state.selectedFilePath,
      closeImage: this.closeImage.bind(this),
    });

    const $loading = this.getComponentTag("Loading");
    new Loading($loading, {
      isLoading: this.$state.isLoading,
    });
  }

  loadData() {
    this.setNodesWithLoading(null);
  }

  async setNodesWithLoading(rootNode) {
    this.setState({ isLoading: true });
    await this.setNodes(rootNode);
    this.setState({ isLoading: false });
  }

  async setNodes(rootNode) {
    const rootNodeId = rootNode ? rootNode.id : "";

    try {
      const childNodes = await getNodes(rootNodeId);
      console.log(childNodes);

      this.setState({
        currentNodeId: rootNodeId,
        childNodes,
        depth: [...this.$state.depth, rootNode],
        selectedFilePath: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  /** @param {Node} node */
  async onClick(node) {
    try {
      if (node.type == "DIRECTORY") {
        await this.setNodesWithLoading(node);
      } else if (node.type == "FILE") {
        this.setState({
          selectedFilePath: node.filePath,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onPrevButton() {
    const { depth } = this.$state;
    depth.pop();
    const parentNode = depth.pop();

    try {
      await this.setNodesWithLoading(parentNode);
    } catch (error) {
      console.log(error);
    }
  }

  closeImage() {
    this.setState({
      selectedFilePath: "",
    });
  }
}
