import Component from "../core/Component.js";

export default class Breadcrumb extends Component {
  template() {
    return `
      <nav class="Breadcrumb">
        <div>root</div>
        <div>하얀고양이</div>
      </nav>
    `;
  }
}
