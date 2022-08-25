import Component from "../core/Component.js";

export default class Breadcrumb extends Component {
  template() {
    return `
      <nav class="Breadcrumb">
        <div>root</div>
        ${this.$props.depth
          .map(
            (node) => `
        <div>${node.name}</div>
        `
          )
          .join("")}
      </nav>
    `;
  }
}
