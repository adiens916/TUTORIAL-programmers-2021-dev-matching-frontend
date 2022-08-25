import Component from "../core/Component.js";
import { getImage } from "../api/app.js";
export default class ImageView extends Component {
  template() {
    if (this.$props.selectedFilePath) {
      return `
        <div class="Modal">
          <div>
            <img src=${getImage(this.$props.selectedFilePath)}>
          </div>
        </div>
      `;
    } else {
      return ``;
    }
  }

  setEvent() {
    this.addEvent(".Modal", "click", () => {
      this.$props.closeImage();
    });
  }
}
