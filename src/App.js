import Component from "./core/Component.js";
import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageView from "./components/ImageView.js";

export default class App extends Component {
  setup() {
    this.$state = { nodeId: "" };
  }

  template() {
    return `
      <main class="App">
        <div component="Breadcrumb"></div>
        <div component="Nodes"></div>
        <div component="ImageView"></div>
      </main>
    `;
  }

  mounted() {
    const $breadcrumb = this.$target.querySelector('[component="Breadcrumb"]');
    const $nodes = this.$target.querySelector('[component="Nodes"]');
    const $imageView = this.$target.querySelector('[component="ImageView"]');

    new Breadcrumb($breadcrumb, {});
    new Nodes($nodes, { nodeId: this.$state.nodeId });
  }
}
