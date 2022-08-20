import Component from "../core/Component.js";
import { getImage, getNodes } from "../api/get.js";

export default class Nodes extends Component {
  setup() {
    const { nodeId } = this.$props;

    getNodes(nodeId).then((data) => {
      this.setState({ nodeList: data });
      console.log(this.$state.nodeList);
    });
  }

  template() {
    if (!this.$state) {
      return `<div></div>`;
    } else {
      const { nodeList } = this.$state;

      return `
        <div class="Nodes">
          <div class="Node">
            <img src="./assets/prev.png">
          </div>

          ${nodeList
            .map(({ id, name, type, filePath, parent }) =>
              type === "DIRECTORY"
                ? `<div class="Node">
                  <img src="./assets/directory.png">
                  <div>${name}</div>
                </div>`
                : `<div class="Node">
                  <img src=${getImage(filePath)}>
                  <div>${name}</div>
                </div>`
            )
            // join이 없으면 각각 , 로 연결된다.
            .join("")}
            
        </div>
      `;
    }
  }
}
