import Component from "../core/Component.js";

export default class Breadcrumb extends Component {
  template() {
    return `
      <nav class="Breadcrumb">
        <div>
          <a class="Nav" href="#" data-index="0">root</a>
        </div>
        
        ${this.$props.depth
          .map(
            (node, index) => `
              <div>
                <a 
                  class="Nav"
                  href="#${node.id}" 
                  data-index="${index + 1}"
                >
                  ${node.name}
                </a>
              </div>
              `
          )
          .join("")}
      </nav>
    `;
  }

  setEvent() {
    this.addEvent(".Nav", "click", (target) => {
      // console.log(target);
      this.$props.goDepth(Number(target.dataset.index));
    });
  }
}
