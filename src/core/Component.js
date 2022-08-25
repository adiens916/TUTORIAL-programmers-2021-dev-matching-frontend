export default class Component {
  $target;
  $props;
  $state;

  /**
   * @param {Element} $target
   * @param {Object} $props
   */
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  template() {
    return ``;
  }

  setEvent() {}

  /**
   * @param {string} selector
   * @param {string} eventType
   * @param {EventListener} callback
   */
  addEvent(selector, eventType, callback) {
    /**
     * event listener를 각각의 하위 요소가 아니라
     * component의 target 자체에 등록
     * 따라서 매번 추가로 등록할 필요가 없어짐.
     */

    this.$target.addEventListener(eventType, (event) => {
      // 해당 selector를 찾고, 못 찾으면 null을 반환
      const target = event.target.closest(selector);
      if (target) {
        callback(target);
      }
    });
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted() {}

  getComponentTag(selector) {
    return this.$target.querySelector(`[data-component="${selector}"]`);
  }

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
