import Component from "../core/Component.js";
import { getImage, getNodes } from "../api/app.js";
import nodeSample from "../api/getNodesSample.json" assert { type: "json" };

/**
 * @typedef { import('../types').Node } Node
 */
export default class Nodes extends Component {
  template() {
    if (this.$props.childNodes) {
      const { childNodes } = this.$props;

      return `
        <div class="Nodes">
          ${
            this.$props.currentNodeId
              ? `<div class="PrevButton">
              <img src="./assets/prev.png">
            </div>`
              : ``
          }

          ${childNodes
            .map(
              (node) =>
                `<div class="Node" data-id="${node.id}">
                  <img src=${this.getNodeIcon(node.type)}>
                  <div>${node.name}</div>
                </div>`
            )
            // join이 없으면 각각 , 로 연결된다.
            .join("")}
            
        </div>
      `;
    }
  }

  getNodeIcon(type) {
    return type === "DIRECTORY"
      ? "./assets/directory.png"
      : "./assets/file.png";
  }

  setEvent() {
    this.addEvent(".Node", "click", (target) => {
      const { id } = target.dataset;
      const node = this.$props.childNodes.find((node) => node.id == id);
      this.$props.onClick(node);
    });

    this.addEvent(".PrevButton", "click", () => {
      this.$props.onPrevButton();
    });
  }
}
