import Component from "../core/Component.js";
import { getImage, getNodes } from "../api/app.js";
import nodeSample from "../api/getNodesSample.json" assert { type: "json" };

/**
 * @typedef { import('../types').Node } Node
 */
export default class Nodes extends Component {
  setup() {
    /**
     * @type {{ nodes: Node[] }}
     */
    this.$state = {
      nodes: nodeSample,
    };
    // getNodes(nodeId).then((data) => {
    //   this.setState({ nodeList: data });
    //   console.log(this.$state.nodeList);
    // });
  }

  template() {
    if (this.$state.nodes) {
      const nodes = this.$state.nodes;

      return `
        <div class="Nodes">
          <div class="Node">
            <img src="./assets/prev.png">
          </div>

          ${nodes
            .map(
              ({ id, name, type, filePath, parent }) =>
                `<div class="Node">
                  <img src=${this.getNodeIcon(type)}>
                  <div>${name}</div>
                </div>`
            )
            // join이 없으면 각각 , 로 연결된다.
            .join("")}
            
        </div>
      `;
    }
  }

  setEvent() {}

  getNodeIcon(type) {
    return type === "DIRECTORY"
      ? "./assets/directory.png"
      : "./assets/file.png";
  }
}
