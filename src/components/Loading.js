import Component from "../core/Component.js";

export default class Loading extends Component {
  template() {
    if (this.$props.isLoading) {
      return `
        <div class="Modal">
          <div>
            <img src="./assets/nyan-cat.gif">
          </div>
        </div>
      `;
    } else {
      return ``;
    }
  }
}
